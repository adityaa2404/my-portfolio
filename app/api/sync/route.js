import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/lib/models/Post';
import StatsCache from '@/lib/models/StatsCache';

const SYNC_TTL = 30 * 60 * 1000; // 30 minutes

const LC_RECENT_SUBMISSIONS_QUERY = `
  query recentAcSubmissions($username: String!, $limit: Int!) {
    recentAcSubmissionList(username: $username, limit: $limit) {
      title
      titleSlug
      timestamp
      lang
      statusDisplay
    }
  }
`;

export async function POST() {
  try {
    await dbConnect();

    // Check if we synced recently
    const lastSync = await StatsCache.findOne({ key: 'lastSync' }).lean();
    if (lastSync && Date.now() - new Date(lastSync.fetchedAt).getTime() < SYNC_TTL) {
      return NextResponse.json({ synced: false, reason: 'recently synced' });
    }

    let ghInserted = 0;
    let lcInserted = 0;

    /* ── GitHub events → posts ─── */
    try {
      const eventsRes = await fetch('https://api.github.com/users/adityaa2404/events?per_page=10');
      const events = await eventsRes.json();

      if (Array.isArray(events)) {
        const pushEvents = events
          .filter((e) => e.type === 'PushEvent' || e.type === 'PullRequestEvent')
          .slice(0, 6);

        for (const e of pushEvents) {
          const sourceId = `gh-${e.id}`;

          // Skip if already in DB
          const exists = await Post.findOne({ sourceId }).lean();
          if (exists) continue;

          let postData;

          if (e.type === 'PushEvent') {
            const repoName = e.repo?.name || '';
            const before = e.payload?.before;
            const head = e.payload?.head;
            let commitCount = e.payload?.size || 0;
            let commitMsgs = '';

            // Try compare API for commit details
            if (before && head && repoName) {
              try {
                const cmpRes = await fetch(
                  `https://api.github.com/repos/${repoName}/compare/${before}...${head}`
                );
                const cmp = await cmpRes.json();
                commitCount = cmp.ahead_by || cmp.total_commits || commitCount;
                if (Array.isArray(cmp.commits)) {
                  commitMsgs = cmp.commits
                    .slice(0, 3)
                    .map((c) => `• ${c.commit?.message?.split('\n')[0] || 'commit'}`)
                    .join('\n');
                }
              } catch {}
            }

            // Fallback from payload
            if (!commitMsgs && Array.isArray(e.payload?.commits) && e.payload.commits.length > 0) {
              commitCount = e.payload.commits.length;
              commitMsgs = e.payload.commits
                .slice(0, 3)
                .map((c) => `• ${c.message}`)
                .join('\n');
            }

            const shortRepo = repoName.split('/')[1] || repoName;
            postData = {
              type: 'github',
              title: `Push to ${shortRepo}`,
              text: commitCount > 0
                ? `Pushed ${commitCount} commit${commitCount !== 1 ? 's' : ''}${commitMsgs ? ':\n' + commitMsgs : ''}`
                : `Pushed to ${shortRepo} branch ${(e.payload?.ref || '').replace('refs/heads/', '')}`,
              image: '/github.webp',
              tag: '#github #commits',
              createdAt: new Date(e.created_at),
            };
          } else {
            // PullRequestEvent
            const pr = e.payload?.pull_request;
            postData = {
              type: 'github',
              title: `PR ${e.payload?.action}: ${pr?.title || 'Pull Request'}`,
              text: `${e.payload?.action === 'opened' ? 'Opened' : 'Updated'} PR in ${e.repo?.name?.split('/')[1] || e.repo?.name}${pr?.body ? `: ${pr.body.slice(0, 120)}` : ''}`,
              image: '/github.webp',
              tag: '#github #pullrequest',
              createdAt: new Date(e.created_at),
            };
          }

          await Post.create({
            ...postData,
            sourceId,
            source: 'github',
            replies: Math.floor(Math.random() * 5),
            reposts: Math.floor(Math.random() * 8),
            likes: Math.floor(Math.random() * 40) + 5,
            views: `${(Math.random() * 3 + 0.5).toFixed(1)}K`,
          });
          ghInserted++;
        }
      }
    } catch (err) {
      console.error('GitHub sync error:', err.message);
    }

    /* ── LeetCode recent submissions → posts ─── */
    try {
      const lcRes = await fetch('https://leetcode.com/graphql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Referer: 'https://leetcode.com',
        },
        body: JSON.stringify({
          query: LC_RECENT_SUBMISSIONS_QUERY,
          variables: { username: 'adityaapotdar', limit: 5 },
        }),
      });

      const lcData = await lcRes.json();
      const submissions = lcData?.data?.recentAcSubmissionList || [];

      for (const sub of submissions.slice(0, 5)) {
        const sourceId = `lc-${sub.timestamp}-${sub.titleSlug}`;

        const exists = await Post.findOne({ sourceId }).lean();
        if (exists) continue;

        await Post.create({
          type: 'leetcode',
          title: `Solved: ${sub.title}`,
          text: `Aditya just submitted "${sub.title}" on LeetCode in ${sub.lang}. Keep grinding! 🧠`,
          image: '/leetcode.png',
          tag: '#leetcode #dsa',
          sourceId,
          source: 'leetcode',
          createdAt: new Date(parseInt(sub.timestamp) * 1000),
          replies: Math.floor(Math.random() * 5),
          reposts: Math.floor(Math.random() * 6),
          likes: Math.floor(Math.random() * 30) + 5,
          views: `${(Math.random() * 2 + 0.5).toFixed(1)}K`,
        });
        lcInserted++;
      }
    } catch (err) {
      console.error('LeetCode sync error:', err.message);
    }

    // Update last sync timestamp
    await StatsCache.findOneAndUpdate(
      { key: 'lastSync' },
      { key: 'lastSync', data: { ghInserted, lcInserted }, fetchedAt: new Date() },
      { upsert: true }
    );

    return NextResponse.json({ synced: true, ghInserted, lcInserted });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
