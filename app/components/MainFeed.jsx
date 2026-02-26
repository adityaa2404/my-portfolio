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
import {
  SiLeetcode,
  SiJavascript, SiTypescript, SiPython, SiHtml5, SiCss3,
  SiReact, SiNextdotjs, SiExpress, SiNodedotjs, SiTailwindcss, SiSpringboot,
  SiMongodb, SiPostgresql, SiMysql, SiSupabase, SiFirebase, SiPrisma,
  SiGit, SiGithub, SiVscodium, SiIntellijidea, SiVercel, SiPostman, SiDocker,
  SiCplusplus, SiC,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import { useMemo, useState } from 'react';

const Globe = dynamic(() => import('./Globe'), { ssr: false });

/* ── format IST helper ────────────────────────── */
function formatIST(dateStr) {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  } catch {
    return '';
  }
}

/* ── Skill Icon Map ──────────────────────────── */
const SKILL_ICON_MAP = {
  'JavaScript': { Icon: SiJavascript, color: '#F7DF1E' },
  'TypeScript': { Icon: SiTypescript, color: '#3178C6' },
  'C': { Icon: SiC, color: '#A8B9CC' },
  'C++': { Icon: SiCplusplus, color: '#00599C' },
  'Java': { Icon: FaJava, color: '#ED8B00' },
  'Python': { Icon: SiPython, color: '#3776AB' },
  'HTML': { Icon: SiHtml5, color: '#E34F26' },
  'CSS': { Icon: SiCss3, color: '#1572B6' },
  'React': { Icon: SiReact, color: '#61DAFB' },
  'Next.js': { Icon: SiNextdotjs, color: '#ffffff' },
  'Express.js': { Icon: SiExpress, color: '#ffffff' },
  'Node.js': { Icon: SiNodedotjs, color: '#5FA04E' },
  'Tailwind CSS': { Icon: SiTailwindcss, color: '#06B6D4' },
  'Spring Boot': { Icon: SiSpringboot, color: '#6DB33F' },
  'MongoDB': { Icon: SiMongodb, color: '#47A248' },
  'PostgreSQL': { Icon: SiPostgresql, color: '#4169E1' },
  'MySQL': { Icon: SiMysql, color: '#4479A1' },
  'Supabase': { Icon: SiSupabase, color: '#3FCF8E' },
  'Firebase': { Icon: SiFirebase, color: '#DD2C00' },
  'Prisma': { Icon: SiPrisma, color: '#2D3748' },
  'Git': { Icon: SiGit, color: '#F05032' },
  'GitHub': { Icon: SiGithub, color: '#ffffff' },
  'VS Code': { Icon: SiVscodium, color: '#007ACC' },
  'IntelliJ IDEA': { Icon: SiIntellijidea, color: '#000000' },
  'Vercel': { Icon: SiVercel, color: '#ffffff' },
  'Postman': { Icon: SiPostman, color: '#FF6C37' },
  'Docker': { Icon: SiDocker, color: '#2496ED' },
};

/* ── animation variants ─────────────────────── */
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
};
const stagger = { animate: { transition: { staggerChildren: 0.04 } } };

/* ── Tweet Card ──────────────────────────────── */
function TweetCard({ post, index, liked, onToggleLike, avatar }) {
  return (
    <motion.article
      className={`tweet-card ${post.type === 'pinned' ? 'pinned' : ''}`}
      variants={fadeUp}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.4) }}
    >
      {post.type === 'pinned' && (
        <div className="tweet-pinned-label">
          <FiRepeat size={12} /> Pinned
        </div>
      )}
      <div className="tweet-body">
        <div className="tweet-avatar-col">
          {avatar ? (
            <img
              src={avatar}
              alt="Aditya"
              className="tweet-avatar-img-icon"
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                objectFit: 'cover',
              }}
            />
          ) : (
            <div className="tweet-avatar">AP</div>
          )}
        </div>
        <div className="tweet-content-col">
          <div className="tweet-header">
            <span className="tweet-display-name">Aditya Potdar</span>
            <span className="tweet-handle">@aaditya2404</span>
            <span className="tweet-dot">·</span>
            <span className="tweet-timestamp">
              {formatIST(post.createdAt) || 'Just now'}
            </span>
          </div>
          {post.title && post.title !== 'Pinned' && (
            <p className="tweet-title-line">{post.title}</p>
          )}
          <p className="tweet-text">{post.text}</p>
          {/* Post image for github/leetcode posts */}
          {post.image && (
            <div className="tweet-image" style={{ marginTop: 10, marginBottom: 6 }}>
              <img
                src={post.image}
                alt={post.type}
                style={{
                  width: '100%',
                  maxHeight: 220,
                  objectFit: 'cover',
                  borderRadius: 12,
                  border: '1px solid var(--border, rgba(255,255,255,0.08))',
                }}
              />
            </div>
          )}
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

/* ── Project Card (redesigned) ────────────────── */
function ProjectCard({ project, index }) {
  return (
    <motion.div
      className="project-card-v2"
      variants={fadeUp}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.45, delay: index * 0.14 }}
      whileHover={{ y: -6, boxShadow: '0 16px 48px rgba(29,155,240,0.18)' }}
    >
      {/* Gradient banner */}
      <div className="pv2-banner" style={{ background: project.gradient }}>
        <span className="pv2-emoji">{project.emoji}</span>
        {project.status && <span className="pv2-status">{project.status}</span>}
      </div>

      <div className="pv2-body">
        <h3 className="pv2-title">{project.title}</h3>

        {/* Tech tags */}
        <div className="pv2-tags">
          {(Array.isArray(project.stack) ? project.stack : [project.stack]).map((t) => (
            <span key={t} className="pv2-tag">{t}</span>
          ))}
        </div>

        <p className="pv2-desc">{project.description}</p>

        {/* Highlights */}
        {project.highlights && (
          <ul className="pv2-highlights">
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}

        {/* Metric badge */}
        <div className="pv2-metric">
          <FiBarChart2 size={14} /> {project.metric}
        </div>

        {/* Links */}
        <div className="pv2-links">
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="pv2-link">
              <FiGithub size={15} /> Code
            </a>
          )}
          {project.demo && (
            <a href={project.demo} target="_blank" rel="noopener noreferrer" className="pv2-link pv2-link-demo">
              <FiExternalLink size={15} /> Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

/* ── Skill Chip ──────────────────────────────── */
function SkillChip({ name, icon, delay }) {
  const IconComp = icon?.Icon;
  return (
    <motion.span
      className="skill-chip"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ scale: 1.08, backgroundColor: 'var(--accent)', color: '#fff' }}
    >
      {IconComp && <IconComp size={16} color={icon.color} />}
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

/* ── GitHub Heatmap ─────────────────────────── */
function GitHubHeatmap({ data }) {
  // data may be flat array of { date, count, level } or nested weeks
  // Normalize to flat array, take last ~365 entries
  let flat = [];
  if (Array.isArray(data)) {
    if (data.length > 0 && Array.isArray(data[0])) {
      flat = data.flat();
    } else {
      flat = data;
    }
  }

  // Take last 365 days worth
  const recent = flat.slice(-371);

  // Group into weeks (columns of 7)
  const weeks = [];
  for (let i = 0; i < recent.length; i += 7) {
    weeks.push(recent.slice(i, i + 7));
  }

  const getColor = (level, count) => {
    if (count === 0 || level === 0) return 'var(--heatmap-0, rgba(255,255,255,0.06))';
    if (level === 1) return 'var(--heatmap-1, #0e4429)';
    if (level === 2) return 'var(--heatmap-2, #006d32)';
    if (level === 3) return 'var(--heatmap-3, #26a641)';
    return 'var(--heatmap-4, #39d353)';
  };

  const totalContribs = recent.reduce((s, d) => s + (d.count || 0), 0);

  if (weeks.length === 0) return null;

  return (
    <div className="gh-heatmap">
      <div className="gh-heatmap-grid">
        {weeks.map((week, wi) => (
          <div key={wi} className="gh-heatmap-col">
            {week.map((day, di) => (
              <div
                key={di}
                className="gh-heatmap-cell"
                title={`${day.date}: ${day.count} contribution${day.count !== 1 ? 's' : ''}`}
                style={{ backgroundColor: getColor(day.level, day.count) }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="gh-heatmap-footer">
        <span className="gh-heatmap-total">{totalContribs} contributions in the last year</span>
        <div className="gh-heatmap-legend">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <div
              key={l}
              className="gh-heatmap-cell"
              style={{ backgroundColor: getColor(l, l) }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
  );
}

/* ── LeetCode Heatmap ───────────────────────── */
function LeetCodeHeatmap({ data }) {
  // data = [{ date: 'YYYY-MM-DD', count }] sorted by date
  // Take last ~365 days
  const now = new Date();
  const oneYearAgo = new Date(now);
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  const recent = data.filter((d) => d.date >= oneYearAgo.toISOString().split('T')[0]);
  const maxCount = Math.max(...recent.map((d) => d.count), 1);

  // Build a full 365-day grid with gaps filled
  const dayMap = {};
  recent.forEach((d) => { dayMap[d.date] = d.count; });

  const days = [];
  const start = new Date(oneYearAgo);
  // Align to Sunday
  start.setDate(start.getDate() - start.getDay());
  for (let d = new Date(start); d <= now; d.setDate(d.getDate() + 1)) {
    const key = d.toISOString().split('T')[0];
    days.push({ date: key, count: dayMap[key] || 0 });
  }

  // Group into weeks
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }

  const getColor = (count) => {
    if (count === 0) return 'var(--lc-heatmap-0, rgba(255,255,255,0.06))';
    const ratio = count / maxCount;
    if (ratio <= 0.25) return 'var(--lc-heatmap-1, #3e2723)';
    if (ratio <= 0.5) return 'var(--lc-heatmap-2, #e65100)';
    if (ratio <= 0.75) return 'var(--lc-heatmap-3, #ff9800)';
    return 'var(--lc-heatmap-4, #ffa116)';
  };

  const totalSubs = recent.reduce((s, d) => s + d.count, 0);

  if (weeks.length === 0) return null;

  return (
    <div className="gh-heatmap">
      <div className="gh-heatmap-grid">
        {weeks.map((week, wi) => (
          <div key={wi} className="gh-heatmap-col">
            {week.map((day, di) => (
              <div
                key={di}
                className="gh-heatmap-cell"
                title={`${day.date}: ${day.count} submission${day.count !== 1 ? 's' : ''}`}
                style={{ backgroundColor: getColor(day.count) }}
              />
            ))}
          </div>
        ))}
      </div>
      <div className="gh-heatmap-footer">
        <span className="gh-heatmap-total">{totalSubs} submissions in the last year</span>
        <div className="gh-heatmap-legend">
          <span>Less</span>
          {[0, 1, 2, 3, 4].map((l) => (
            <div
              key={l}
              className="gh-heatmap-cell"
              style={{ backgroundColor: getColor(l === 0 ? 0 : (l / 4) * maxCount) }}
            />
          ))}
          <span>More</span>
        </div>
      </div>
    </div>
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
  ghStats,
  lcStats,
  ghHeatmap,
  lcHeatmap,
  likedPosts,
  toggleLike,
}) {
  const [feedTab, setFeedTab] = useState('foryou');
  const [scattered, setScattered] = useState(false);
  const allSkills = useMemo(() => Object.values(skillCategories).flat(), [skillCategories]);
  const scatterPositions = useMemo(() =>
    allSkills.map((_, i) => ({
      x: Math.cos(i * 0.9) * 120 + Math.sin(i * 2.1) * 60,
      y: Math.sin(i * 0.7) * 80 + Math.cos(i * 1.3) * 40,
      rotate: Math.sin(i * 1.5) * 25,
    })),
  [allSkills]);

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

              {/* Sort posts: pinned first, then by date descending */}
              {[...posts]
                .sort((a, b) => {
                  if (a.type === 'pinned') return -1;
                  if (b.type === 'pinned') return 1;
                  const da = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                  const db = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                  return db - da;
                })
                .map((post, i) => (
                <TweetCard
                  key={`${post.type}-${post.createdAt || i}`}
                  post={post}
                  index={i}
                  liked={!!likedPosts[i]}
                  onToggleLike={toggleLike}
                  avatar={ghStats?.avatar}
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
                <p>Technologies I build with daily. Click the playground to scatter!</p>
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
                      <SkillChip key={s} name={s} icon={SKILL_ICON_MAP[s]} delay={ci * 0.1 + si * 0.04} />
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Interactive Scatter Playground */}
              <div className="scatter-section">
                <div className="scatter-header">
                  <h4 className="skill-category-title">🎯 Tech Playground</h4>
                  <motion.button
                    className="scatter-toggle"
                    onClick={() => setScattered(!scattered)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {scattered ? '📐 Organize' : '💥 Scatter'}
                  </motion.button>
                </div>
                <motion.div
                  className="scatter-pane"
                  onClick={() => setScattered(!scattered)}
                >
                  {allSkills.map((skill, i) => {
                    const iconData = SKILL_ICON_MAP[skill];
                    const IconComp = iconData?.Icon;
                    return (
                      <motion.div
                        key={skill}
                        className="scatter-item"
                        animate={scattered ? {
                          x: scatterPositions[i].x,
                          y: scatterPositions[i].y,
                          rotate: scatterPositions[i].rotate,
                        } : { x: 0, y: 0, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 120, damping: 14, delay: i * 0.02 }}
                        whileHover={{ scale: 1.1, zIndex: 10 }}
                      >
                        {IconComp && <IconComp size={20} color={iconData.color} />}
                        <span>{skill}</span>
                      </motion.div>
                    );
                  })}
                </motion.div>
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

                {/* GitHub Contribution Heatmap */}
                {ghHeatmap && ghHeatmap.length > 0 && (
                  <div className="gh-heatmap-section">
                    <h4 className="gh-heatmap-title">Contribution Activity</h4>
                    <GitHubHeatmap data={ghHeatmap} />
                  </div>
                )}
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
                  {lcStats?.contestRating && (
                    <StatCard
                      label="Contest Rating"
                      value={lcStats.contestRating}
                      color="#a855f7"
                    />
                  )}
                  {lcStats?.streak && (
                    <StatCard
                      label="Current Streak"
                      value={`${lcStats.streak}🔥`}
                      color="#ff6b35"
                    />
                  )}
                  {lcStats?.totalActiveDays && (
                    <StatCard
                      label="Active Days"
                      value={lcStats.totalActiveDays}
                      color="#1d9bf0"
                    />
                  )}
                </div>
                {lcStats?.ranking && (
                  <p className="lc-ranking">
                    Global Ranking: <strong>#{lcStats.ranking.toLocaleString()}</strong>
                  </p>
                )}

                {/* LeetCode Submission Heatmap */}
                {lcHeatmap && lcHeatmap.length > 0 && (
                  <div className="gh-heatmap-section">
                    <h4 className="gh-heatmap-title">Submission Activity</h4>
                    <LeetCodeHeatmap data={lcHeatmap} />
                  </div>
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
