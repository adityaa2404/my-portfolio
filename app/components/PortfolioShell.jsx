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
  Languages: ['C++', 'Java', 'Python', 'JavaScript', 'TypeScript'],
  Frameworks: ['React', 'Next.js', 'Node.js', 'Express', 'FastAPI'],
  Libraries: ['Redux', 'Tailwind CSS', 'Framer Motion', 'Three.js'],
  Databases: ['MongoDB', 'PostgreSQL', 'MySQL'],
  Services: ['Firebase', 'Supabase', 'AWS', 'Vercel', 'Google Cloud'],
  'Dev Tools': ['Git', 'GitHub', 'Docker', 'Postman', 'VS Code'],
};

const interestBlocks = [
  { name: '🏏 Cricket', headline: 'India squad updates + IPL analytics trends' },
  { name: '🚗 Cars', headline: 'EV performance wars heating up in 2026' },
  { name: '🏍 Bikes', headline: 'Adventure touring segment sees new launches' },
];

export default function PortfolioShell() {
  const [path, setPath] = useState('/');
  const [theme, setTheme] = useState('dark');
  const [showGrok, setShowGrok] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Ask anything about Aditya Potdar.' },
  ]);
  const [trending, setTrending] = useState([]);
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

  // Fetch trending
  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await fetch(
          'https://hn.algolia.com/api/v1/search?query=AI%20JavaScript%20Open%20Source&tags=story'
        );
        const data = await res.json();
        setTrending(data.hits.slice(0, 5));
      } catch {
        setTrending([]);
      }
    };
    fetchTrending();
    const interval = setInterval(fetchTrending, 6 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch GitHub + LeetCode
  useEffect(() => {
    (async () => {
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

      try {
        const lcRes = await fetch('https://alfa-leetcode-api.onrender.com/aaditya2404');
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

  const sendMessage = useCallback(() => {
    if (!chatInput.trim()) return;
    const normalized = chatInput.toLowerCase();
    const next = [...messages, { role: 'user', text: chatInput }];

    if (/(connect|reach|contact|hire|mail|whatsapp|phone|call).*(aditya)?/.test(normalized)) {
      next.push({
        role: 'bot',
        text: "Here's how to reach Aditya:",
        quickActions: true,
      });
    } else if (/(skill|tech|stack|know|language|framework)/.test(normalized)) {
      next.push({
        role: 'bot',
        text: 'Aditya works with C++, JavaScript, Python, React, Next.js, Node.js, Express, MongoDB, and more. He has solved 400+ DSA problems and is proficient in the MERN stack.',
      });
    } else if (/(project|build|ship|work)/.test(normalized)) {
      next.push({
        role: 'bot',
        text: 'Key projects: BillMaster (MERN billing platform), LawBuddy AI (legal document assistant with Vertex AI), and Lister AI (voice-powered material list generator). Check the Explore tab for more!',
      });
    } else if (/(education|college|study|cgpa|degree)/.test(normalized)) {
      next.push({
        role: 'bot',
        text: 'Aditya is pursuing B.E. in Electronics & Computer Engineering at PICT, Pune (2023–2027) with a CGPA of 9.73/10.',
      });
    } else if (/(who|about|intro|tell)/.test(normalized)) {
      next.push({
        role: 'bot',
        text: 'Aditya Potdar is a third-year engineering student at PICT Pune, focused on full-stack development, AI systems, and competitive programming. He builds scalable web apps, AI-powered tools, and solves 400+ DSA problems.',
      });
    } else {
      next.push({
        role: 'bot',
        text: 'Aditya is focused on building scalable web applications, AI-powered products, and problem-solving systems. Ask about his skills, projects, education, or how to connect!',
      });
    }

    setMessages(next);
    setChatInput('');
  }, [chatInput, messages]);

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
      <RightSidebar trending={trending} interestBlocks={interestBlocks} />
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
        messages={messages}
        chatInput={chatInput}
        setChatInput={setChatInput}
        sendMessage={sendMessage}
        onClose={() => setShowGrok(false)}
      />
    </div>
  );
}
