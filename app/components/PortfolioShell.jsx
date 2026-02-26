'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import LeftSidebar from './LeftSidebar';
import MainFeed from './MainFeed';
import RightSidebar from './RightSidebar';
import MobileNav from './MobileNav';
import GrokModal from './GrokModal';

const navItems = [
  { label: 'Home', icon: 'home', path: '/' },
  { label: 'Explore', icon: 'explore', path: '/projects' },
  { label: 'Notifications', icon: 'bell', path: '/notifications' },
  { label: 'Chat', icon: 'chat', path: '/chat' },
  { label: 'Grok', icon: 'grok', path: '/grok', modal: true },
  { label: 'Bookmarks', icon: 'bookmark', path: '/bookmarks' },
  { label: 'Skills', icon: 'code', path: '/skills' },
  { label: 'Profile', icon: 'user', path: '/profile' },
  {
    label: 'More',
    icon: 'more',
    path: 'https://www.linkedin.com/in/adityapotdar24/',
    externalLink: true,
  },
];

const starterPosts = [
  {
    type: 'pinned',
    title: 'Pinned',
    text: "Hi, I'm Aditya Potdar. I build scalable web apps, AI-powered systems, and solve real-world problems through clean, efficient code.",
    tag: '#buildinpublic',
    replies: 42,
    reposts: 18,
    likes: 256,
    views: '12.4K',
  },
  {
    type: 'build',
    title: 'Build Log',
    text: 'Shipped this Twitter-style portfolio with dark/light mode, Three.js tech orbit, AI chat assistant, and live GitHub + LeetCode stats. Every pixel intentional.',
    tag: '#frontend',
    replies: 8,
    reposts: 12,
    likes: 89,
    views: '3.2K',
  },
  {
    type: 'thread',
    title: '🧵 Problem → Solution',
    text: "Problem: Static portfolios feel dead.\nSolution: A timeline-based portfolio with live stats, trending tech cards, and conversational AI — feels alive, current, and real.",
    tag: '#productthinking',
    replies: 15,
    reposts: 24,
    likes: 178,
    views: '8.1K',
  },
  {
    type: 'github',
    title: 'GitHub Activity',
    text: 'Pushed 5 commits to portfolio repo. Improved UX performance with route-level rendering and lazy-loaded Three.js scenes.',
    tag: '#github',
    replies: 3,
    reposts: 5,
    likes: 34,
    views: '1.8K',
  },
  {
    type: 'build',
    title: 'LawBuddy AI',
    text: 'Built an AI legal assistant — OCR-based parsing with Google Document AI, clause interpretation with Vertex AI (Gemini), and Pinecone vector search. Top 44 accuracy at HackRx 6.0. 🚀',
    tag: '#AI #hackathon',
    replies: 21,
    reposts: 30,
    likes: 312,
    views: '15.2K',
  },
  {
    type: 'build',
    title: 'Lister AI',
    text: 'Voice → categorized material list → Excel export. Whisper AI handles transcription, Gemini LLM categorizes, FastAPI + Pandas generates Excel. Zero manual effort.',
    tag: '#voiceAI #automation',
    replies: 6,
    reposts: 9,
    likes: 67,
    views: '4.5K',
  },
];

const projectCards = [
  {
    title: 'BillMaster',
    stack: 'MERN, Redux Toolkit, TailwindCSS',
    description:
      'Full-stack electrical billing and estimation platform with live editing, modular MVC backend, and synchronized bill state across sessions.',
    github: 'https://github.com/adityaa2404',
    demo: null,
    metric: 'Reduced estimation time by 60%',
    emoji: '⚡',
    gradient: 'linear-gradient(135deg, #6366f1, #a855f7)',
  },
  {
    title: 'LawBuddy AI',
    stack: 'FastAPI, Vertex AI, Pinecone, Google Cloud',
    description:
      'AI legal assistant for OCR parsing, risk detection, clause interpretation, and conversational Q&A on legal documents.',
    github: 'https://github.com/adityaa2404',
    demo: null,
    metric: 'Top 44 Accuracy at HackRx 6.0',
    emoji: '⚖️',
    gradient: 'linear-gradient(135deg, #1d9bf0, #7856ff)',
  },
  {
    title: 'Lister AI',
    stack: 'Whisper AI, Gemini LLM, React, FastAPI',
    description:
      'Voice-powered electrical material list generator with auto-categorization and automated Excel export.',
    github: 'https://github.com/adityaa2404',
    demo: null,
    metric: 'Automated entire list generation workflow',
    emoji: '🎙️',
    gradient: 'linear-gradient(135deg, #f91880, #a855f7)',
  },
];

const skillCategories = {
  Languages: ['JavaScript', 'TypeScript', 'C', 'C++', 'Java', 'Python', 'HTML', 'CSS'],
  'Frameworks & Libraries': ['React', 'Next.js', 'Express.js', 'Node.js', 'Tailwind CSS', 'Spring Boot'],
  'Databases & Services': ['MongoDB', 'PostgreSQL', 'MySQL', 'Supabase', 'Firebase', 'Prisma'],
  'Developer Tools': ['Git', 'GitHub', 'VS Code', 'IntelliJ IDEA', 'Vercel', 'Postman', 'Docker'],
};

const interestBlocks = [
  { name: '🏏 Cricket', headline: 'India squad updates + IPL analytics trends' },
  { name: '🚗 Cars', headline: 'EV performance wars heating up in 2026' },
  { name: '🏍 Bikes', headline: 'Adventure touring segment sees new launches' },
];

/* ── LeetCode GraphQL query ─────────────────── */
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

export default function PortfolioShell() {
  const [path, setPath] = useState('/');
  const [theme, setTheme] = useState('dark');
  const [showGrok, setShowGrok] = useState(false);
  const [ghStats, setGhStats] = useState(null);
  const [lcStats, setLcStats] = useState(null);
  const [posts, setPosts] = useState(starterPosts);
  const [likedPosts, setLikedPosts] = useState({});

  // Theme persistence
  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Fetch trending — now handled inside RightSidebar itself

  // Fetch GitHub events + stats + LeetCode submissions
  useEffect(() => {
    (async () => {
      /* ── GitHub stats ─────────── */
      try {
        const [userRes, repoRes] = await Promise.all([
          fetch('https://api.github.com/users/adityapotdar24'),
          fetch('https://api.github.com/users/adityapotdar24/repos?per_page=100'),
        ]);
        const user = await userRes.json();
        const repos = await repoRes.json();
        const stars = Array.isArray(repos)
          ? repos.reduce((s, r) => s + r.stargazers_count, 0)
          : 0;
        setGhStats({
          followers: user.followers,
          repos: user.public_repos,
          stars,
          avatar: user.avatar_url,
        });
      } catch {
        setGhStats(null);
      }

      /* ── GitHub events → dynamic posts ─── */
      try {
        const eventsRes = await fetch('https://api.github.com/users/adityapotdar/events?per_page=10');
        const events = await eventsRes.json();
        if (Array.isArray(events)) {
          const ghPosts = events
            .filter((e) => e.type === 'PushEvent' || e.type === 'PullRequestEvent')
            .slice(0, 4)
            .map((e) => {
              if (e.type === 'PushEvent') {
                const commits = e.payload?.commits || [];
                const commitMsgs = commits
                  .slice(0, 3)
                  .map((c) => `• ${c.message}`)
                  .join('\n');
                return {
                  type: 'github',
                  title: `Push to ${e.repo?.name?.split('/')[1] || e.repo?.name}`,
                  text: `Pushed ${commits.length} commit${commits.length !== 1 ? 's' : ''}:\n${commitMsgs}`,
                  image: '/github.webp',
                  tag: '#github #commits',
                  replies: Math.floor(Math.random() * 5),
                  reposts: Math.floor(Math.random() * 8),
                  likes: Math.floor(Math.random() * 40) + 5,
                  views: `${(Math.random() * 3 + 0.5).toFixed(1)}K`,
                  timestamp: e.created_at,
                };
              }
              // PullRequestEvent
              const pr = e.payload?.pull_request;
              return {
                type: 'github',
                title: `PR ${e.payload?.action}: ${pr?.title || 'Pull Request'}`,
                text: `${e.payload?.action === 'opened' ? 'Opened' : 'Updated'} PR in ${e.repo?.name?.split('/')[1] || e.repo?.name}${pr?.body ? `: ${pr.body.slice(0, 120)}` : ''}`,
                image: '/github.webp',
                tag: '#github #pullrequest',
                replies: Math.floor(Math.random() * 8),
                reposts: Math.floor(Math.random() * 10),
                likes: Math.floor(Math.random() * 50) + 10,
                views: `${(Math.random() * 4 + 1).toFixed(1)}K`,
                timestamp: e.created_at,
              };
            });

          if (ghPosts.length > 0) {
            setPosts((prev) => {
              // Insert after the first 3 starter posts
              const head = prev.slice(0, 3);
              const tail = prev.slice(3);
              return [...head, ...ghPosts, ...tail];
            });
          }
        }
      } catch {
        // GitHub events fetch failed silently
      }

      /* ── LeetCode stats ─────────── */
      try {
        const lcRes = await fetch('https://alfa-leetcode-api.onrender.com/adityaapotdar');
        const d = await lcRes.json();
        setLcStats({
          solved: d.totalSolved,
          easy: d.easySolved,
          medium: d.mediumSolved,
          hard: d.hardSolved,
          ranking: d.ranking,
        });
      } catch {
        setLcStats(null);
      }

      /* ── LeetCode recent submissions → dynamic posts ─── */
      try {
        const lcSubRes = await fetch('/api/leetcode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            query: LC_RECENT_SUBMISSIONS_QUERY,
            variables: { username: 'adityaapotdar', limit: 5 },
          }),
        });
        const lcSubData = await lcSubRes.json();
        const submissions = lcSubData?.data?.recentAcSubmissionList || [];

        if (submissions.length > 0) {
          const lcPosts = submissions.slice(0, 3).map((sub) => ({
            type: 'leetcode',
            title: `Solved: ${sub.title}`,
            text: `Aditya just submitted "${sub.title}" on LeetCode in ${sub.lang}. Keep grinding! 🧠`,
            image: '/leetcode.png',
            tag: '#leetcode #dsa',
            replies: Math.floor(Math.random() * 5),
            reposts: Math.floor(Math.random() * 6),
            likes: Math.floor(Math.random() * 30) + 5,
            views: `${(Math.random() * 2 + 0.5).toFixed(1)}K`,
            timestamp: new Date(parseInt(sub.timestamp) * 1000).toISOString(),
          }));

          setPosts((prev) => {
            // Insert after GitHub posts / starter posts
            const insertIdx = Math.min(prev.length, 5);
            return [...prev.slice(0, insertIdx), ...lcPosts, ...prev.slice(insertIdx)];
          });
        }
      } catch {
        // LeetCode submissions fetch failed silently
      }
    })();
  }, []);

  // Infinite scroll
  useEffect(() => {
    const onScroll = () => {
      if (path !== '/') return;
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 300) {
        setPosts((prev) => {
          if (prev.length > 16) return prev;
          return [
            ...prev,
            {
              type: 'build',
              text: `Shipped update #${prev.length + 1} — consistency is the compound interest of developer growth. Keep building. 🔥`,
              tag: '#consistency',
              replies: Math.floor(Math.random() * 20),
              reposts: Math.floor(Math.random() * 15),
              likes: Math.floor(Math.random() * 100),
              views: `${(Math.random() * 5).toFixed(1)}K`,
            },
          ];
        });
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [path]);

  const techOrbit = useMemo(
    () => Object.values(skillCategories).flat().slice(0, 14),
    []
  );

  const onNavClick = useCallback(
    (item) => {
      if (item.modal) {
        setShowGrok(true);
        return;
      }
      if (item.path === '/chat') {
        window.open('https://wa.me/917745060502', '_blank');
        return;
      }
      if (item.externalLink) {
        window.open(item.path, '_blank');
        return;
      }
      setPath(item.path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    []
  );

  const toggleLike = useCallback((idx) => {
    setLikedPosts((prev) => ({ ...prev, [idx]: !prev[idx] }));
    setPosts((prev) =>
      prev.map((p, i) => {
        if (i !== idx) return p;
        const liked = !likedPosts[idx];
        return { ...p, likes: (p.likes || 0) + (liked ? 1 : -1) };
      })
    );
  }, [likedPosts]);

  return (
    <div className="app-shell">
      <LeftSidebar
        navItems={navItems}
        path={path}
        onNavClick={onNavClick}
        avatar={ghStats?.avatar}
      />
      <MainFeed
        path={path}
        theme={theme}
        setTheme={setTheme}
        posts={posts}
        projectCards={projectCards}
        skillCategories={skillCategories}
        techOrbit={techOrbit}
        ghStats={ghStats}
        lcStats={lcStats}
        likedPosts={likedPosts}
        toggleLike={toggleLike}
      />
      <RightSidebar />
      <MobileNav
        path={path}
        navigate={(p) => {
          setPath(p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenGrok={() => setShowGrok(true)}
      />
      <GrokModal
        show={showGrok}
        onClose={() => setShowGrok(false)}
      />
    </div>
  );
}
