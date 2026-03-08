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
    title: 'BillMaster',
    stack: ['MERN', 'Redux Toolkit', 'TailwindCSS'],
    description:
      'Full-stack electrical billing and estimation platform with live editing, modular MVC backend, and synchronized bill state across sessions.',
    github: 'https://github.com/adityaa2404',
    demo: null,
    metric: 'Reduced estimation time by 60%',
    emoji: '⚡',
    highlights: ['Live bill editing', 'Role-based auth', 'PDF export'],
    status: 'Production',
  },
  {
    title: 'LawBuddy AI',
    stack: ['FastAPI', 'Vertex AI', 'Pinecone', 'Google Cloud'],
    description:
      'AI legal assistant for OCR parsing, risk detection, clause interpretation, and conversational Q&A on legal documents.',
    github: 'https://github.com/adityaa2404',
    demo: null,
    metric: 'Top 44 Accuracy at HackRx 6.0',
    emoji: '⚖️',
    highlights: ['OCR + Document AI', 'Vector search', 'Legal Q&A chatbot'],
    status: 'Hackathon Winner',
  },
  {
    title: 'Lister AI',
    stack: ['Whisper AI', 'Gemini LLM', 'React', 'FastAPI'],
    description:
      'Voice-powered electrical material list generator with auto-categorization and automated Excel export.',
    github: 'https://github.com/adityaa2404',
    demo: null,
    metric: 'Automated entire list generation workflow',
    emoji: '🎙️',
    highlights: ['Voice transcription', 'LLM categorization', 'Excel export'],
    status: 'Production',
  },
];

const skillCategories = {
  Languages: ['JavaScript', 'TypeScript', 'C', 'C++', 'Java', 'Python', 'HTML', 'CSS'],
  'Frameworks & Libraries': ['React', 'Next.js', 'Express.js', 'Node.js', 'Tailwind CSS'],
  'Databases & Services': ['MongoDB', 'PostgreSQL', 'MySQL', 'Supabase', 'Firebase', 'Prisma'],
  'Developer Tools': ['Git', 'GitHub', 'VS Code', 'IntelliJ IDEA', 'Vercel', 'Postman', 'Docker'],
};

const interestBlocks = [
  { name: '🏏 Cricket', headline: 'India squad updates + IPL analytics trends' },
  { name: '🚗 Cars', headline: 'EV performance wars heating up in 2026' },
  { name: '🏍 Bikes', headline: 'Adventure touring segment sees new launches' },
];

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

  // Sync GitHub/LeetCode posts to DB, then load everything from DB
  useEffect(() => {
    (async () => {
      setFeedLoading(true);

      // Auto-seed if DB is empty (first load)
      try {
        const postsRes = await fetch('/api/posts');
        const dbPosts = await postsRes.json();
        if (!Array.isArray(dbPosts) || dbPosts.length === 0) {
          await fetch('/api/seed', { method: 'POST' });
        }
      } catch {}

      // Sync GitHub events + LeetCode submissions → DB (server-side, 30min TTL)
      try {
        await fetch('/api/sync', { method: 'POST' });
      } catch {}

      // Load all posts from DB (already sorted: pinned first, then newest)
      try {
        const postsRes = await fetch('/api/posts');
        const allPosts = await postsRes.json();
        if (Array.isArray(allPosts) && allPosts.length > 0) {
          setPosts(allPosts);
        }
      } catch {}

      // Fetch cached stats from API (profile stats + heatmaps)
      try {
        const statsRes = await fetch('/api/stats');
        const stats = await statsRes.json();
        if (stats.ghStats) setGhStats(stats.ghStats);
        if (stats.ghHeatmap) setGhHeatmap(stats.ghHeatmap);
        if (stats.lcStats) setLcStats(stats.lcStats);
        if (stats.lcHeatmap) setLcHeatmap(stats.lcHeatmap);
      } catch {}

      setFeedLoading(false);
    })();
  }, []);

  // Infinite scroll removed — no junk posts

  const onNavClick = useCallback(
    (item) => {
      if (item.modal) {
        setShowAsk(true);
        return;
      }
      if (item.path === '/chat') {
        window.open('https://wa.me/', '_blank');
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
