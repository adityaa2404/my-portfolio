'use client';

import { useEffect, useState, useCallback } from 'react';
import LeftSidebar from './LeftSidebar';
import MainFeed from './MainFeed';
import RightSidebar from './RightSidebar';
import MobileNav from './MobileNav';
import GrokModal from './GrokModal';
import { AnimatePresence, motion } from 'framer-motion';

const navItems = [
  { label: 'Home', icon: 'home', path: '/' },
  { label: 'Explore', icon: 'explore', path: '/projects' },
  { label: 'Notifications', icon: 'bell', path: '/notifications' },
  { label: 'Chat', icon: 'chat', path: '/chat' },
  { label: 'Ask', icon: 'grok', path: '/grok', modal: true },
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

const starterPosts = [];

const projectCards = [
  {
    title: 'Legal Assist',
    stack: ['React', 'TypeScript', 'FastAPI', 'Celery', 'Redis', 'MongoDB', 'Presidio', 'EasyOCR', 'Clerk'],
    description:
      'Privacy-preserving legal document RAG application for citation-grounded chat, document analysis, risk scoring, and clause extraction.',
    github: 'https://github.com/adityaa2404/legal-assist',
    demo: 'https://legal-assist-neon.vercel.app/',
    metric: 'Vectorless retrieval with BM25 + hierarchical document search',
    highlights: ['Streaming legal chat', 'Async OCR processing', 'PII anonymization for Indian legal entities'],
  },
  {
    title: 'BillMaster',
    stack: ['React 19', 'Node.js', 'Express', 'MongoDB', 'Redux Toolkit'],
    description:
      'Electrical billing and estimation system for managing customers, hierarchical work structures, quotations, and professional invoices.',
    github: 'https://github.com/adityaa2404/bill-master',
    demo: 'https://bill-master-opal.vercel.app/',
    metric: 'Faster recurring estimation through customer-specific rate memory',
    highlights: ['Immutable bill snapshots', 'Automated pricing workflows', 'Print-ready PDF invoices'],
  },
  {
    title: 'Distributor360',
    stack: ['FastAPI', 'Supabase', 'PostgreSQL', 'AWS', 'GitHub Actions', 'Google Workspace'],
    description:
      'CRM and digital diary platform for mutual fund distributors, with scalable APIs, Google Workspace automations, and multilingual natural-language data access.',
    github: null,
    demo: null,
    metric: 'Natural-language data retrieval in under 7 seconds',
    highlights: ['English, Hindi, and Hinglish NL-to-SQL', 'Google Sheets, Calendar, and email workflows', '8-layer security architecture'],
    status: 'Internship Project',
  },
];

const skillCategories = {
  Languages: ['C++', 'Python', 'JavaScript', 'SQL'],
  Frontend: ['React', 'Redux Toolkit', 'Tailwind CSS', 'Framer Motion', 'HTML', 'CSS'],
  Backend: ['FastAPI', 'Node.js', 'REST APIs', 'JWT Authentication'],
  Databases: ['PostgreSQL', 'MongoDB', 'MySQL', 'Supabase'],
  'DevOps & Cloud': ['Docker', 'Docker Compose', 'GitHub Actions', 'AWS EC2', 'Shell Scripting', 'Git'],
  'AI & Tools': ['LLMs', 'RAG', 'MCP', 'LangChain', 'LangGraph', 'Claude Code', 'Cursor', 'Google AI Studio'],
};

export default function PortfolioShell() {
  const [path, setPath] = useState('/');
  const [theme, setTheme] = useState('dark');
  const [showAsk, setShowAsk] = useState(false);
  const [ghStats, setGhStats] = useState(null);
  const [lcStats, setLcStats] = useState(null);
  const [ghHeatmap, setGhHeatmap] = useState([]);
  const [lcHeatmap, setLcHeatmap] = useState([]);
  const [posts, setPosts] = useState(starterPosts);
  const [likedPosts, setLikedPosts] = useState({});
  const [feedLoading, setFeedLoading] = useState(true);
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const [visitCount, setVisitCount] = useState(null);

  // Theme persistence
  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'dark';
    setTheme(saved);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  // URL routing sync
  useEffect(() => {
    const url = window.location.pathname;
    if (url !== '/') setPath(url);
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Fetch trending — now handled inside RightSidebar itself

  // Load posts immediately — but keep the skel visible long enough to feel intentional
  useEffect(() => {
    let alive = true;
    const startedAt = Date.now();

    (async () => {
      setFeedLoading(true);
      try {
        const res = await fetch('/api/posts').catch(() => null);
        const dbPosts = res ? await res.json() : [];
        if (Array.isArray(dbPosts) && dbPosts.length > 0) {
          setPosts(dbPosts);
        } else {
          await fetch('/api/seed', { method: 'POST' }).catch(() => null);
          const retry = await fetch('/api/posts').catch(() => null);
          const seeded = retry ? await retry.json() : [];
          if (Array.isArray(seeded) && seeded.length > 0) setPosts(seeded);
        }
      } catch {}

      const elapsed = Date.now() - startedAt;
      const minDelay = 700;
      const waitTime = Math.max(0, minDelay - elapsed);

      window.setTimeout(() => {
        if (alive) setFeedLoading(false);
      }, waitTime);
    })();

    return () => {
      alive = false;
    };
  }, []);

  // Load stats independently (slow third-party APIs, shouldn't block the feed)
  useEffect(() => {
    fetch('/api/stats')
      .then((r) => r.json())
      .then((stats) => {
        if (stats.ghStats) setGhStats(stats.ghStats);
        if (stats.ghHeatmap) setGhHeatmap(stats.ghHeatmap);
        if (stats.lcStats) setLcStats(stats.lcStats);
        if (stats.lcHeatmap) setLcHeatmap(stats.lcHeatmap);
      })
      .catch(() => {});
  }, []);

  // Sync GitHub/LeetCode activity into posts in the background, then refresh feed
  useEffect(() => {
    fetch('/api/sync', { method: 'POST' })
      .then(() => fetch('/api/posts'))
      .then((r) => r.json())
      .then((freshPosts) => {
        if (Array.isArray(freshPosts) && freshPosts.length > 0) setPosts(freshPosts);
      })
      .catch(() => {});
  }, []);

  // Increment visit count on mount
  useEffect(() => {
    fetch('/api/visit', { method: 'POST' })
      .then(r => r.json())
      .then(d => setVisitCount(d.count))
      .catch(() => {});
  }, []);

  const onNavClick = useCallback(
    (item) => {
      if (item.modal) {
        setShowAsk(true);
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
      window.history.pushState({}, '', item.path);
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
        notifCount={posts.filter(p => p.source === 'github' || p.source === 'leetcode').length}
      />
      <MainFeed
        path={path}
        theme={theme}
        setTheme={setTheme}
        posts={posts}
        projectCards={projectCards}
        skillCategories={skillCategories}
        ghStats={ghStats}
        lcStats={lcStats}
        ghHeatmap={ghHeatmap}
        lcHeatmap={lcHeatmap}
        likedPosts={likedPosts}
        toggleLike={toggleLike}
        loading={feedLoading}
        visitCount={visitCount}
        onOpenDrawer={() => setIsMobileDrawerOpen(true)}
      />
      
      {/* Desktop Right Sidebar */}
      <div className="desktop-only">
        <RightSidebar />
      </div>

      {/* Mobile Drawer wrapper for navigation on mobile */}
      <AnimatePresence>
        {isMobileDrawerOpen && (
          <>
            <motion.div 
              className="mobile-drawer-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileDrawerOpen(false)}
            />
            <motion.div 
              className="mobile-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
              <LeftSidebar
                navItems={navItems}
                path={path}
                onNavClick={(item) => {
                  onNavClick(item);
                  setIsMobileDrawerOpen(false);
                }}
                avatar={ghStats?.avatar}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <MobileNav
        path={path}
        navigate={(p) => {
          setPath(p);
          window.history.pushState({}, '', p);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenAsk={() => setShowAsk(true)}
      />
      <GrokModal
        show={showAsk}
        onClose={() => setShowAsk(false)}
      />
    </div>
  );
}
