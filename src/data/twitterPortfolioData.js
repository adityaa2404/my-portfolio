import {
  FiHome,
  FiHash,
  FiBell,
  FiMessageCircle,
  FiCpu,
  FiBookmark,
  FiCode,
  FiUser,
  FiMoreHorizontal,
} from 'react-icons/fi';

export const navItems = [
  { label: 'Home', icon: FiHome, path: '/' },
  { label: 'Explore', icon: FiHash, path: '/projects' },
  { label: 'Notifications', icon: FiBell, path: '/notifications' },
  { label: 'Chat', icon: FiMessageCircle, path: '/chat' },
  { label: 'Grok', icon: FiCpu, path: '/grok', modal: true },
  { label: 'Bookmarks', icon: FiBookmark, path: '/bookmarks' },
  { label: 'Skills', icon: FiCode, path: '/skills' },
  { label: 'Profile', icon: FiUser, path: '/profile' },
  { label: 'More', icon: FiMoreHorizontal, path: 'https://www.linkedin.com/in/adityapotdar24/', externalLink: true },
];

export const starterPosts = [
  {
    type: 'pinned',
    title: 'Pinned Intro',
    content: 'Hi, I’m Aditya. I build scalable web apps, AI systems, and solve real-world problems through code.',
    tag: '#buildinpublic',
  },
  {
    type: 'build',
    title: 'Build Log',
    content: 'Shipped Twitter-style portfolio feed with dark/light mode, responsive navigation, and smooth microinteractions.',
    tag: '#frontend',
  },
  {
    type: 'thread',
    title: 'Problem → Solution',
    content: 'Problem: Static portfolios feel dead. Solution: A timeline-based portfolio with live stats, trend cards, and AI chat.',
    tag: '#productthinking',
  },
  {
    type: 'github',
    title: 'GitHub Activity',
    content: 'Pushed 5 commits to portfolio repo and improved UX performance with route-level rendering.',
    tag: '#github',
  },
];

export const projectCards = [
  {
    title: 'BillMaster',
    stack: 'MERN, Redux Toolkit, TailwindCSS',
    description: 'Electrical billing and estimation platform with live editing, modular MVC backend, and synchronized bill state.',
    github: 'https://github.com/',
    demo: 'https://example.com',
    metric: 'Reduced estimation time by 60%',
  },
  {
    title: 'LawBuddy AI',
    stack: 'FastAPI, Vertex AI, Pinecone, Google Cloud',
    description: 'AI legal assistant for OCR parsing, risk detection, clause interpretation, and conversational Q&A.',
    github: 'https://github.com/',
    demo: 'https://example.com',
    metric: 'Top 44 Accuracy at HackRx 6.0',
  },
  {
    title: 'Lister AI',
    stack: 'Whisper AI, Gemini LLM, React, FastAPI',
    description: 'Voice-powered electrical material list generator with auto-categorization and Excel export.',
    github: 'https://github.com/',
    demo: 'https://example.com',
    metric: 'Automated complete list generation workflow',
  },
];

export const skillCategories = {
  Languages: ['C++', 'Java', 'Python', 'JavaScript', 'TypeScript'],
  Frameworks: ['React', 'Next.js', 'Node.js', 'Express'],
  Libraries: ['Redux', 'Tailwind', 'Framer Motion', 'Three.js'],
  Databases: ['MongoDB', 'PostgreSQL', 'MySQL'],
  Services: ['Firebase', 'Supabase', 'AWS', 'Vercel'],
  'Dev Tools': ['Git', 'GitHub', 'Postman', 'Docker', 'VS Code'],
};

export const interestBlocks = [
  { name: '🏏 Cricket', headline: 'India squad updates + IPL analytics trends' },
  { name: '🚗 Cars', headline: 'EV performance wars heating up in 2026' },
  { name: '🏍 Bikes', headline: 'Adventure touring segment sees new launches' },
];
