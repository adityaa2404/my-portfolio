'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { interestBlocks, navItems, projectCards, skillCategories, starterPosts } from '../data/twitterPortfolioData';
import LeftSidebar from './twitter/LeftSidebar';
import MainFeed from './twitter/MainFeed';
import RightSidebar from './twitter/RightSidebar';
import MobileNav from './twitter/MobileNav';
import GrokModal from './twitter/GrokModal';

export default function PortfolioApp() {
  const router = useRouter();
  const pathname = usePathname();
  const path = pathname || '/';

  const [theme, setTheme] = useState('dark');
  const [posts, setPosts] = useState(starterPosts);
  const [showGrok, setShowGrok] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'bot', text: 'Ask anything about Aditya Potdar.' }]);
  const [trending, setTrending] = useState([]);
  const [ghStats, setGhStats] = useState(null);
  const [lcStats, setLcStats] = useState(null);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await fetch('https://hn.algolia.com/api/v1/search?query=AI%20JavaScript%20Open%20Source&tags=story');
        const data = await response.json();
        setTrending(data.hits.slice(0, 5));
      } catch {
        setTrending([]);
      }
    };

    fetchTrending();
    const interval = setInterval(fetchTrending, 1000 * 60 * 60 * 6);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchProfileStats = async () => {
      try {
        const userRes = await fetch('https://api.github.com/users/adityapotdar24');
        const repoRes = await fetch('https://api.github.com/users/adityapotdar24/repos?per_page=100');
        const user = await userRes.json();
        const repos = await repoRes.json();
        const stars = Array.isArray(repos) ? repos.reduce((sum, repo) => sum + repo.stargazers_count, 0) : 0;

        setGhStats({ followers: user.followers, repos: user.public_repos, stars, avatar: user.avatar_url });
      } catch {
        setGhStats(null);
      }

      try {
        const lcRes = await fetch('https://alfa-leetcode-api.onrender.com/aaditya2404');
        const lcData = await lcRes.json();
        setLcStats({
          solved: lcData.totalSolved,
          easy: lcData.easySolved,
          medium: lcData.mediumSolved,
          hard: lcData.hardSolved,
          ranking: lcData.ranking,
        });
      } catch {
        setLcStats(null);
      }
    };

    fetchProfileStats();
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (path !== '/') return;
      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 300;
      if (nearBottom) {
        setPosts((prev) => {
          if (prev.length > 16) return prev;
          return [
            ...prev,
            {
              type: 'build',
              title: 'Infinite Feed Update',
              content: `Shipped extra feed item #${prev.length + 1} with animation and hover actions.`,
              tag: '#consistency',
            },
          ];
        });
      }
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [path]);

  const techOrbit = useMemo(() => Object.values(skillCategories).flat().slice(0, 14), []);

  const navigate = (nextPath) => router.push(nextPath);

  const onNavClick = (item) => {
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

    navigate(item.path);
  };

  const sendMessage = () => {
    if (!chatInput.trim()) return;
    const normalized = chatInput.toLowerCase();
    const next = [...messages, { role: 'user', text: chatInput }];

    if (/(connect|reach|contact).*(aditya)/.test(normalized)) {
      next.push({ role: 'bot', text: 'Send hi to Aditya on WhatsApp or email Aditya directly.' });
    } else {
      next.push({ role: 'bot', text: 'Aditya is focused on scalable web apps, AI products, and problem-solving systems.' });
    }

    setMessages(next);
    setChatInput('');
  };

  return (
    <div className="app-shell">
      <LeftSidebar navItems={navItems} path={path} onNavClick={onNavClick} />
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
      />
      <RightSidebar trending={trending} interestBlocks={interestBlocks} />
      <MobileNav navigate={navigate} onOpenGrok={() => setShowGrok(true)} />
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
