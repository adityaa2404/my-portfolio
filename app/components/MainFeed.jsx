'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMessageCircle,
  FiRepeat,
  FiHeart,
  FiBarChart2,
  FiShare,
  FiMapPin,
  FiCalendar,
  FiExternalLink,
  FiGithub,
  FiSun,
  FiMoon,
  FiArrowLeft,
} from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';

const TechOrbit = dynamic(() => import('./TechOrbit'), { ssr: false });
const Globe = dynamic(() => import('./Globe'), { ssr: false });

/* ── animation variants ─────────────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};
const stagger = { animate: { transition: { staggerChildren: 0.07 } } };

/* ── Tweet Card ──────────────────────────────── */
function TweetCard({ post, index, liked, onToggleLike }) {
  const typeEmoji =
    post.type === 'pinned'
      ? '📌'
      : post.type === 'thread'
      ? '🧵'
      : post.type === 'github'
      ? '🐙'
      : '🔧';

  return (
    <motion.article
      className={`tweet-card ${post.type === 'pinned' ? 'pinned' : ''}`}
      variants={fadeUp}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.35, delay: index * 0.06 }}
      layout
    >
      {post.type === 'pinned' && (
        <div className="tweet-pinned-label">
          <FiRepeat size={12} /> Pinned
        </div>
      )}
      <div className="tweet-body">
        <div className="tweet-avatar-col">
          <div className="tweet-avatar">{typeEmoji}</div>
        </div>
        <div className="tweet-content-col">
          <div className="tweet-header">
            <span className="tweet-display-name">Aditya Potdar</span>
            <span className="tweet-handle">@aaditya2404</span>
            <span className="tweet-dot">·</span>
            <span className="tweet-timestamp">
              {post.title || 'Just now'}
            </span>
          </div>
          <p className="tweet-text">{post.text}</p>
          {post.tag && <span className="tweet-tag">{post.tag}</span>}
          <div className="tweet-actions">
            <button className="tweet-action" title="Reply">
              <FiMessageCircle size={16} />
              <span>{post.replies || 0}</span>
            </button>
            <button className="tweet-action" title="Repost">
              <FiRepeat size={16} />
              <span>{post.reposts || 0}</span>
            </button>
            <button
              className={`tweet-action ${liked ? 'liked' : ''}`}
              onClick={() => onToggleLike(index)}
              title="Like"
            >
              <FiHeart size={16} />
              <span>{post.likes || 0}</span>
            </button>
            <button className="tweet-action" title="Views">
              <FiBarChart2 size={16} />
              <span>{post.views || 0}</span>
            </button>
            <button className="tweet-action" title="Share">
              <FiShare size={16} />
            </button>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ── Project Card ────────────────────────────── */
function ProjectCard({ project, index }) {
  return (
    <motion.div
      className="project-card"
      variants={fadeUp}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.4, delay: index * 0.12 }}
      whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(29,155,240,0.12)' }}
    >
      <div className="project-card-accent" style={{ background: project.gradient }} />
      <div className="project-card-inner">
        <div className="project-emoji">{project.emoji}</div>
        <h3 className="project-title">{project.title}</h3>
        <p className="project-stack">{project.stack}</p>
        <p className="project-desc">{project.description}</p>
        <div className="project-metric">
          <FiBarChart2 size={14} /> {project.metric}
        </div>
        <div className="project-links">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <FiGithub size={16} /> Code
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer">
              <FiExternalLink size={16} /> Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Skill Chip ──────────────────────────────── */
function SkillChip({ name, delay }) {
  return (
    <motion.span
      className="skill-chip"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.08, backgroundColor: 'var(--accent)', color: '#fff' }}
    >
      {name}
    </motion.span>
  );
}

/* ── Stats Card ─────────────────────────────── */
function StatCard({ label, value, sub, color }) {
  return (
    <motion.div
      className="stat-card"
      whileHover={{ y: -2, boxShadow: `0 8px 24px ${color}22` }}
    >
      <div className="stat-value" style={{ color }}>
        {value ?? '—'}
      </div>
      <div className="stat-label">{label}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </motion.div>
  );
}

/* ── Main Feed ───────────────────────────────── */
export default function MainFeed({
  path,
  theme,
  setTheme,
  posts,
  projectCards,
  skillCategories,
  techOrbit,
  ghStats,
  lcStats,
  likedPosts,
  toggleLike,
}) {
  const [feedTab, setFeedTab] = useState('foryou');

  const headerTitle = useMemo(() => {
    switch (path) {
      case '/':
        return 'Home';
      case '/projects':
        return 'Explore';
      case '/notifications':
        return 'Notifications';
      case '/bookmarks':
        return 'Bookmarks';
      case '/skills':
        return 'Skills';
      case '/profile':
        return 'Profile';
      default:
        return 'Home';
    }
  }, [path]);

  return (
    <main className="main-feed">
      {/* Sticky Header */}
      <header className="feed-header">
        <div className="feed-header-inner">
          {path !== '/' && (
            <button className="feed-back-btn" onClick={() => window.history.back()}>
              <FiArrowLeft size={20} />
            </button>
          )}
          <h2 className="feed-header-title">{headerTitle}</h2>
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
        </div>

        {/* Tabs (Home only) */}
        {path === '/' && (
          <div className="feed-tabs">
            {['foryou', 'following'].map((tab) => (
              <button
                key={tab}
                className={`feed-tab ${feedTab === tab ? 'active' : ''}`}
                onClick={() => setFeedTab(tab)}
              >
                {tab === 'foryou' ? 'For you' : 'Following'}
                {feedTab === tab && (
                  <motion.span
                    className="tab-indicator"
                    layoutId="feedTab"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Route Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={path}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {/* HOME — Timeline */}
          {path === '/' && (
            <motion.div variants={stagger} initial="initial" animate="animate">
              {/* Compose Box */}
              <div className="compose-box">
                <div className="compose-avatar">
                  {ghStats?.avatar ? (
                    <img src={ghStats.avatar} alt="" />
                  ) : (
                    <div className="compose-avatar-placeholder">AP</div>
                  )}
                </div>
                <div className="compose-input">
                  <span>What&apos;s happening in your dev journey?</span>
                </div>
              </div>

              {posts.map((post, i) => (
                <TweetCard
                  key={i}
                  post={post}
                  index={i}
                  liked={!!likedPosts[i]}
                  onToggleLike={toggleLike}
                />
              ))}
            </motion.div>
          )}

          {/* PROJECTS / EXPLORE */}
          {path === '/projects' && (
            <div className="projects-view">
              <div className="section-intro">
                <h3>Featured Projects</h3>
                <p>Built with passion, shipped with precision.</p>
              </div>
              <div className="projects-grid">
                {projectCards.map((project, i) => (
                  <ProjectCard key={project.title} project={project} index={i} />
                ))}
              </div>
            </div>
          )}

          {/* NOTIFICATIONS */}
          {path === '/notifications' && (
            <div className="notifications-view">
              {[
                {
                  icon: '🎯',
                  text: (
                    <>
                      <strong>HackRx 6.0</strong> — LawBuddy AI achieved Top 44
                      accuracy ranking
                    </>
                  ),
                  time: '2024',
                },
                {
                  icon: '⭐',
                  text: (
                    <>
                      <strong>PICT Semester</strong> — Achieved CGPA 9.73/10
                    </>
                  ),
                  time: '2024',
                },
                {
                  icon: '🏆',
                  text: (
                    <>
                      <strong>LeetCode</strong> — Crossed {lcStats?.solved || '400'}+ problems
                      solved
                    </>
                  ),
                  time: '2024',
                },
                {
                  icon: '🚀',
                  text: (
                    <>
                      <strong>BillMaster</strong> — Reduced estimation time by 60%
                    </>
                  ),
                  time: '2024',
                },
                {
                  icon: '🎓',
                  text: (
                    <>
                      <strong>PICT, Pune</strong> — Enrolled in B.E. E&CE
                    </>
                  ),
                  time: '2023',
                },
              ].map((notif, i) => (
                <motion.div
                  className="notification-item"
                  key={i}
                  variants={fadeUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: i * 0.08 }}
                >
                  <span className="notif-icon">{notif.icon}</span>
                  <div className="notif-content">
                    <p>{notif.text}</p>
                    <span className="notif-time">{notif.time}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* BOOKMARKS */}
          {path === '/bookmarks' && (
            <div className="bookmarks-view">
              <div className="section-intro">
                <h3>Saved Resources</h3>
                <p>My go-to references and bookmarks.</p>
              </div>
              {[
                {
                  title: 'React Docs',
                  url: 'https://react.dev',
                  desc: 'Official React documentation — hooks, patterns, and best practices.',
                },
                {
                  title: 'Three.js Journey',
                  url: 'https://threejs-journey.com',
                  desc: 'The ultimate Three.js course for creative web development.',
                },
                {
                  title: 'Neetcode 150',
                  url: 'https://neetcode.io',
                  desc: 'Curated DSA roadmap for coding interview prep.',
                },
                {
                  title: 'System Design Primer',
                  url: 'https://github.com/donnemartin/system-design-primer',
                  desc: 'Learn how to design large-scale systems.',
                },
              ].map((bm, i) => (
                <motion.a
                  key={i}
                  href={bm.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bookmark-card"
                  variants={fadeUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <div className="bookmark-info">
                    <h4>{bm.title}</h4>
                    <p>{bm.desc}</p>
                    <span className="bookmark-url">{bm.url}</span>
                  </div>
                  <FiExternalLink size={16} className="bookmark-ext" />
                </motion.a>
              ))}
            </div>
          )}

          {/* SKILLS */}
          {path === '/skills' && (
            <div className="skills-view">
              <div className="section-intro">
                <h3>Tech Stack</h3>
                <p>Technologies I build with daily.</p>
              </div>
              {Object.entries(skillCategories).map(([cat, skills], ci) => (
                <motion.div
                  key={cat}
                  className="skill-category"
                  variants={fadeUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: ci * 0.1 }}
                >
                  <h4 className="skill-category-title">{cat}</h4>
                  <div className="skill-chips">
                    {skills.map((s, si) => (
                      <SkillChip key={s} name={s} delay={ci * 0.1 + si * 0.04} />
                    ))}
                  </div>
                </motion.div>
              ))}
              <div className="tech-orbit-container">
                <h4 className="skill-category-title" style={{ marginBottom: 16 }}>
                  🌌 Tech Orbit
                </h4>
                <div className="orbit-canvas-wrap">
                  <TechOrbit items={techOrbit} />
                </div>
              </div>
            </div>
          )}

          {/* PROFILE */}
          {path === '/profile' && (
            <div className="profile-view">
              {/* Banner */}
              <div className="profile-banner">
                <div className="profile-banner-inner">
                  <Globe />
                </div>
              </div>

              {/* Avatar + Info */}
              <div className="profile-info-section">
                <div className="profile-avatar-wrap">
                  {ghStats?.avatar ? (
                    <img src={ghStats.avatar} alt="Aditya" className="profile-avatar-img" />
                  ) : (
                    <div className="profile-avatar-placeholder">AP</div>
                  )}
                </div>
                <div className="profile-actions">
                  <motion.a
                    href="mailto:adityapotdar2404@gmail.com"
                    className="profile-edit-btn"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    Contact Me
                  </motion.a>
                </div>
                <h2 className="profile-display-name">Aditya Potdar</h2>
                <span className="profile-handle">@aaditya2404</span>
                <p className="profile-bio">
                  Full-Stack Developer · AI Systems Builder · 400+ DSA Problems · PICT
                  Pune &apos;27
                </p>
                <div className="profile-meta">
                  <span>
                    <FiMapPin size={14} /> Pune, India
                  </span>
                  <span>
                    <FiCalendar size={14} /> Joined 2023
                  </span>
                </div>
                <div className="profile-follow-stats">
                  <span>
                    <strong>{ghStats?.followers ?? '—'}</strong> Followers
                  </span>
                  <span>
                    <strong>{ghStats?.repos ?? '—'}</strong> Repositories
                  </span>
                  <span>
                    <strong>{ghStats?.stars ?? '—'}</strong> Stars
                  </span>
                </div>
              </div>

              {/* GitHub Stats */}
              <div className="profile-section">
                <h3 className="profile-section-title">
                  <FiGithub size={18} /> GitHub Stats
                </h3>
                <div className="stats-grid">
                  <StatCard
                    label="Repositories"
                    value={ghStats?.repos}
                    color="#1d9bf0"
                  />
                  <StatCard
                    label="Followers"
                    value={ghStats?.followers}
                    color="#7856ff"
                  />
                  <StatCard label="Stars" value={ghStats?.stars} color="#f7b731" />
                </div>
              </div>

              {/* LeetCode Stats */}
              <div className="profile-section">
                <h3 className="profile-section-title">
                  <SiLeetcode size={18} /> LeetCode Stats
                </h3>
                <div className="stats-grid">
                  <StatCard
                    label="Total Solved"
                    value={lcStats?.solved}
                    color="#ffa116"
                  />
                  <StatCard label="Easy" value={lcStats?.easy} color="#00b8a3" />
                  <StatCard
                    label="Medium"
                    value={lcStats?.medium}
                    color="#ffc01e"
                  />
                  <StatCard label="Hard" value={lcStats?.hard} color="#ff375f" />
                </div>
                {lcStats?.ranking && (
                  <p className="lc-ranking">
                    Global Ranking: <strong>#{lcStats.ranking.toLocaleString()}</strong>
                  </p>
                )}
              </div>

              {/* Education */}
              <div className="profile-section">
                <h3 className="profile-section-title">🎓 Education</h3>
                <motion.div
                  className="education-card"
                  variants={fadeUp}
                  initial="initial"
                  animate="animate"
                >
                  <div className="education-header">
                    <h4>PICT, Pune</h4>
                    <span className="education-year">2023 — 2027</span>
                  </div>
                  <p>B.E. Electronics & Computer Engineering</p>
                  <div className="education-cgpa">
                    <span className="cgpa-badge">CGPA 9.73 / 10</span>
                  </div>
                </motion.div>
                <motion.div
                  className="education-card"
                  variants={fadeUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.1 }}
                >
                  <div className="education-header">
                    <h4>SNBP International School, Pune</h4>
                    <span className="education-year">2021 — 2023</span>
                  </div>
                  <p>HSC — 88.33%</p>
                </motion.div>
              </div>

              {/* Achievements */}
              <div className="profile-section">
                <h3 className="profile-section-title">🏅 Achievements</h3>
                <div className="achievements-grid">
                  {[
                    { icon: '🏆', text: 'Top 44 at HackRx 6.0' },
                    { icon: '💻', text: '400+ LeetCode Problems' },
                    { icon: '⭐', text: 'CGPA 9.73/10 at PICT' },
                    { icon: '🚀', text: 'Built 3+ Production Apps' },
                    { icon: '🎖', text: 'CodeChef 3-Star Rated' },
                    { icon: '📜', text: 'Google Cloud Certified' },
                  ].map((a, i) => (
                    <motion.div
                      className="achievement-item"
                      key={i}
                      variants={fadeUp}
                      initial="initial"
                      animate="animate"
                      transition={{ delay: i * 0.08 }}
                      whileHover={{ scale: 1.04 }}
                    >
                      <span className="achievement-icon">{a.icon}</span>
                      <span>{a.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
