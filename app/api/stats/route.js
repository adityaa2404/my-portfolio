import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import StatsCache from '@/lib/models/StatsCache';

const CACHE_TTL = 30 * 60 * 1000; // 30 minutes

async function fetchAndCache(key, fetcher) {
  await dbConnect();

  // Check cache
  const cached = await StatsCache.findOne({ key }).lean();
  if (cached && Date.now() - new Date(cached.fetchedAt).getTime() < CACHE_TTL) {
    return cached.data;
  }

  // Fetch fresh
  try {
    const data = await fetcher();
    await StatsCache.findOneAndUpdate(
      { key },
      { key, data, fetchedAt: new Date() },
      { upsert: true }
    );
    return data;
  } catch (err) {
    // Return stale cache if fetch fails
    if (cached) return cached.data;
    throw err;
  }
}

export async function GET() {
  try {
    const [ghStats, ghHeatmap, lcStats, lcHeatmap] = await Promise.all([
      // GitHub stats
      fetchAndCache('github', async () => {
        const [userRes, repoRes] = await Promise.all([
          fetch('https://api.github.com/users/adityaa2404'),
          fetch('https://api.github.com/users/adityaa2404/repos?per_page=100'),
        ]);
        const user = await userRes.json();
        const repos = await repoRes.json();
        const stars = Array.isArray(repos)
          ? repos.reduce((s, r) => s + r.stargazers_count, 0)
          : 0;
        return {
          followers: user.followers,
          repos: user.public_repos,
          stars,
          avatar: user.avatar_url,
        };
      }),

      // GitHub heatmap
      fetchAndCache('ghHeatmap', async () => {
        const res = await fetch(
          'https://github-contributions-api.jogruber.de/v4/adityaa2404?y=last'
        );
        const data = await res.json();
        return data?.contributions || [];
      }),

      // LeetCode stats + contest + calendar
      fetchAndCache('leetcode', async () => {
        const [baseRes, solvedRes, contestRes, calRes] = await Promise.all([
          fetch('https://alfa-leetcode-api.onrender.com/adityaapotdar'),
          fetch('https://alfa-leetcode-api.onrender.com/adityaapotdar/solved'),
          fetch('https://alfa-leetcode-api.onrender.com/adityaapotdar/contest'),
          fetch('https://alfa-leetcode-api.onrender.com/adityaapotdar/calendar'),
        ]);
        const base = await baseRes.json();
        const solved = await solvedRes.json();
        let contestRating = null;
        try {
          const contest = await contestRes.json();
          if (contest.contestRating) contestRating = Math.round(contest.contestRating);
        } catch {}
        let streak = null;
        let totalActiveDays = null;
        try {
          const cal = await calRes.json();
          streak = cal.streak ?? null;
          totalActiveDays = cal.totalActiveDays ?? null;
        } catch {}
        return {
          solved: solved.solvedProblem,
          easy: solved.easySolved,
          medium: solved.mediumSolved,
          hard: solved.hardSolved,
          ranking: base.ranking,
          contestRating,
          streak,
          totalActiveDays,
        };
      }),

      // LeetCode heatmap
      fetchAndCache('lcHeatmap', async () => {
        const res = await fetch(
          'https://alfa-leetcode-api.onrender.com/adityaapotdar/calendar'
        );
        const data = await res.json();
        const calStr = data.submissionCalendar;
        if (!calStr) return [];
        const cal = typeof calStr === 'string' ? JSON.parse(calStr) : calStr;
        const entries = Object.entries(cal).map(([ts, count]) => ({
          date: new Date(Number(ts) * 1000).toISOString().split('T')[0],
          count: Number(count),
        }));
        entries.sort((a, b) => a.date.localeCompare(b.date));
        return entries;
      }),
    ]);

    return NextResponse.json({ ghStats, ghHeatmap, lcStats, lcHeatmap });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
