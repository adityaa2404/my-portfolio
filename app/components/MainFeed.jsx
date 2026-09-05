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
  FiMenu,
  FiCode,
  FiBookOpen,
  FiAward,
  FiArrowRight,
  FiUser,
  FiBookmark,
  FiLayers,
  FiZap,
} from 'react-icons/fi';
import {
  SiLeetcode,
  SiJavascript, SiTypescript, SiPython, SiHtml5, SiCss3,
  SiReact, SiNextdotjs, SiExpress, SiNodedotjs, SiTailwindcss,
  SiMongodb, SiPostgresql, SiMysql, SiSupabase, SiFirebase, SiPrisma,
  SiGit, SiGithub, SiVscodium, SiIntellijidea, SiVercel, SiPostman, SiDocker,
  SiCplusplus, SiC, SiRedux, SiFramer, SiFastapi, SiJsonwebtokens,
  SiGithubactions, SiAmazonwebservices, SiGnubash, SiLangchain, SiClaude, SiGoogle,
} from 'react-icons/si';
import { FaJava } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

const Globe = dynamic(() => import('./Globe'), {
  ssr: false,
  loading: () => (
    <div
      aria-label="Loading globe"
      style={{
        width: '100%',
        height: '100%',
        minHeight: 220,
        borderRadius: 18,
        background: 'radial-gradient(circle at center, rgba(89, 124, 255, 0.2), rgba(10, 12, 18, 0.9))',
        display: 'grid',
        placeItems: 'center',
        color: '#dfe7ff',
        fontSize: 13,
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
      }}
    >
      Loading globe...
    </div>
  ),
});

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
  'Redux Toolkit': { Icon: SiRedux, color: '#764ABC' },
  'Framer Motion': { Icon: SiFramer, color: '#0055FF' },
  'FastAPI': { Icon: SiFastapi, color: '#009688' },
  'JWT Authentication': { Icon: SiJsonwebtokens, color: '#D63AFF' },
  'GitHub Actions': { Icon: SiGithubactions, color: '#2088FF' },
  'AWS EC2': { Icon: SiAmazonwebservices, color: '#FF9900' },
  'Shell Scripting': { Icon: SiGnubash, color: '#4EAA25' },
  'LangChain': { Icon: SiLangchain, color: '#1C3C3C' },
  'Claude Code': { Icon: SiClaude, color: '#D97757' },
  'Google AI Studio': { Icon: SiGoogle, color: '#4285F4' },
};

const TECH_SPHERE_SKILLS = [
  'React', 'Redux Toolkit', 'Tailwind CSS', 'Framer Motion', 'FastAPI', 'Node.js',
  'PostgreSQL', 'MongoDB', 'Docker', 'GitHub Actions', 'LangChain', 'Claude Code',
  'C++', 'Python', 'JavaScript', 'Supabase', 'AWS EC2', 'Git',
];

/* ── X/Twitter-style Shimmer Skeleton ────────── */
function TweetSkeleton() {
  return (
    <div className="tweet-skeleton">
      <div className="skel-avatar shimmer" />
      <div className="skel-body">
        <div className="skel-header">
          <div className="skel-name shimmer" />
          <div className="skel-handle shimmer" />
        </div>
        <div className="skel-line shimmer" style={{ width: '100%' }} />
        <div className="skel-line shimmer" style={{ width: '85%' }} />
        <div className="skel-line shimmer" style={{ width: '60%' }} />
        <div className="skel-actions">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="skel-action shimmer" />
          ))}
        </div>
      </div>
    </div>
  );
}

function FeedSkeletonLoader() {
  return (
    <div className="skeleton-feed">
      <div className="compose-skeleton">
        <div className="skel-avatar shimmer" />
        <div className="skel-compose-line shimmer" />
      </div>
      <div className="profile-prompt-skeleton">
        <div className="skel-prompt-icon shimmer" />
        <div className="skel-prompt-copy">
          <div className="skel-name shimmer" />
          <div className="skel-line shimmer" style={{ width: '72%' }} />
        </div>
      </div>
      {Array.from({ length: 4 }).map((_, i) => (
        <TweetSkeleton key={i} />
      ))}
    </div>
  );
}

/* ── Tweet Card ──────────────────────────────── */
function TweetCard({ post, index, liked, onToggleLike, avatar }) {
  return (
    <article className={`tweet-card ${post.type === 'pinned' ? 'pinned' : ''}`}>

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
    </article>
  );
}

/* ── Project Card (redesigned) ────────────────── */
function ProjectCard({ project, index }) {
  return (
    <div className="project-card-v2">

      {/* Banner header */}
      <div className="pv2-banner">
        <FiCode size={22} className="pv2-icon" />
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
    </div>
  );
}

/* ── Skill Chip ──────────────────────────────── */
function SkillChip({ name, icon }) {
  const IconComp = icon?.Icon;
  return (
    <span className="skill-chip">
      {IconComp && <IconComp size={16} color={icon.color} />}
      {name}
    </span>
  );
}

function TechSphere() {
  const containerRef = useRef(null);
  const itemRefs = useRef([]);
  const rotationRef = useRef(0);
  const pointerRef = useRef({ x: 0, y: 0 });
  const hoveringRef = useRef(false);
  const radius = 142;

  const positions = useMemo(() => {
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    return TECH_SPHERE_SKILLS.map((_, index) => {
      const phi = Math.acos(1 - (2 * (index + 0.5)) / TECH_SPHERE_SKILLS.length);
      const theta = goldenAngle * index;
      return {
        x: Math.sin(phi) * Math.cos(theta),
        y: Math.cos(phi),
        z: Math.sin(phi) * Math.sin(theta),
      };
    });
  }, []);

  const project = useCallback((rotation, tiltX, tiltY) => positions.map((point) => {
    const cosRotation = Math.cos(rotation);
    const sinRotation = Math.sin(rotation);
    let x = point.x * cosRotation + point.z * sinRotation;
    let y = point.y;
    let z = -point.x * sinRotation + point.z * cosRotation;

    const cosTiltX = Math.cos(tiltX);
    const sinTiltX = Math.sin(tiltX);
    [y, z] = [y * cosTiltX - z * sinTiltX, y * sinTiltX + z * cosTiltX];

    const cosTiltY = Math.cos(tiltY);
    const sinTiltY = Math.sin(tiltY);
    [x, z] = [x * cosTiltY + z * sinTiltY, -x * sinTiltY + z * cosTiltY];

    const depth = (z + 1) / 2;
    return { x: x * radius, y: y * radius, z, opacity: 0.2 + depth * 0.8, scale: 0.65 + depth * 0.45 };
  }), [positions]);

  useEffect(() => {
    let frameId;
    const animate = () => {
      if (!hoveringRef.current) rotationRef.current += 0.004;
      project(rotationRef.current, pointerRef.current.y, pointerRef.current.x).forEach((point, index) => {
        const item = itemRefs.current[index];
        if (!item) return;
        item.style.transform = `translate(-50%, -50%) translate3d(${point.x}px, ${point.y}px, 0) scale(${point.scale})`;
        item.style.opacity = String(point.opacity);
        item.style.zIndex = String(Math.round(point.z * 100));
      });
      frameId = requestAnimationFrame(animate);
    };
    frameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameId);
  }, [project]);

  const handlePointerMove = (event) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    pointerRef.current = {
      x: ((event.clientX - rect.left) / rect.width - 0.5) * 0.7,
      y: -((event.clientY - rect.top) / rect.height - 0.5) * 0.7,
    };
  };

  return (
    <section className="tech-sphere-section" aria-label="Interactive technology globe">
      <p className="tech-sphere-label">My technology universe</p>
      <div
        ref={containerRef}
        className="tech-sphere"
        onPointerMove={handlePointerMove}
        onPointerEnter={() => { hoveringRef.current = true; }}
        onPointerLeave={() => {
          hoveringRef.current = false;
          pointerRef.current = { x: 0, y: 0 };
        }}
      >
        <div className="tech-sphere-core" />
        {TECH_SPHERE_SKILLS.map((name, index) => {
          const Icon = SKILL_ICON_MAP[name]?.Icon || FiCode;
          const color = SKILL_ICON_MAP[name]?.color || 'var(--text-secondary)';
          return (
            <span
              className="tech-sphere-icon"
              key={name}
              ref={(element) => { itemRefs.current[index] = element; }}
              title={name}
              style={{ color }}
            >
              <Icon size={30} aria-label={name} />
            </span>
          );
        })}
      </div>
    </section>
  );
}

/* ── Stats Card ─────────────────────────────── */
function StatCard({ label, value, sub }) {
  return (
    <div className="stat-card">
      <div className="stat-value">{value ?? '—'}</div>
      <div className="stat-label">{label}</div>
      {sub && <div className="stat-sub">{sub}</div>}
    </div>
  );
}

/* ── GitHub Heatmap ─────────────────────────── */
function HeatmapScroller({ weeks, children }) {
  const viewportRef = useRef(null);
  const [scrollMax, setScrollMax] = useState(0);
  const [scrollValue, setScrollValue] = useState(0);

  const monthLabels = useMemo(() => {
    let previousMonth = '';
    return weeks.map((week, index) => {
      const day = week.find(Boolean);
      if (!day?.date) return { index, label: '' };
      const date = new Date(`${day.date}T00:00:00`);
      const month = `${date.getFullYear()}-${date.getMonth()}`;
      const label = index === 0 || month !== previousMonth
        ? date.toLocaleDateString('en-US', { month: 'short' })
        : '';
      previousMonth = month;
      return { index, label };
    });
  }, [weeks]);

  useEffect(() => {
    const updateScrollState = () => {
      const viewport = viewportRef.current;
      if (!viewport) return;
      setScrollMax(Math.max(0, viewport.scrollWidth - viewport.clientWidth));
      setScrollValue(viewport.scrollLeft);
    };
    updateScrollState();
    window.addEventListener('resize', updateScrollState);
    return () => window.removeEventListener('resize', updateScrollState);
  }, [weeks.length]);

  const handleRangeChange = (event) => {
    const value = Number(event.target.value);
    if (viewportRef.current) viewportRef.current.scrollLeft = value;
    setScrollValue(value);
  };

  return (
    <>
      <div
        ref={viewportRef}
        className="heatmap-viewport"
        onScroll={(event) => setScrollValue(event.currentTarget.scrollLeft)}
      >
        <div className="heatmap-content">
          <div className="heatmap-months" aria-hidden="true">
            {monthLabels.map(({ index, label }) => <span key={index}>{label}</span>)}
          </div>
          {children}
        </div>
      </div>
      {scrollMax > 0 && (
        <input
          className="heatmap-scrollbar"
          type="range"
          min="0"
          max={scrollMax}
          value={scrollValue}
          onChange={handleRangeChange}
          aria-label="Scroll activity timeline"
        />
      )}
    </>
  );
}

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
      <HeatmapScroller weeks={weeks}>
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
      </HeatmapScroller>
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
      <HeatmapScroller weeks={weeks}>
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
      </HeatmapScroller>
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

/* ── Notifications View ──────────────────────── */
function NotificationsView({ posts, lcStats, ghStats }) {
  const [notifTab, setNotifTab] = useState('all');

  const notifications = useMemo(() => {
    const items = [];

    // Dynamic: generate from recent posts in DB
    if (Array.isArray(posts)) {
      posts.forEach((p) => {
        if (p.source === 'github' || p.type === 'github') {
          items.push({
            id: `gh-${p._id}`,
            type: 'activity',
            accent: 'var(--accent)',
            text: (
              <>
                <strong>GitHub</strong> — {p.title}
                {p.text && <span className="notif-sub">{p.text.split('\n')[0].slice(0, 80)}</span>}
              </>
            ),
            time: p.createdAt,
          });
        } else if (p.source === 'leetcode' || p.type === 'leetcode') {
          items.push({
            id: `lc-${p._id}`,
            type: 'activity',
            accent: 'var(--accent)',
            text: (
              <>
                <strong>LeetCode</strong> - {p.title}
              </>
            ),
            time: p.createdAt,
          });
        }
      });
    }

    // Static milestones (always shown)
    const milestones = [
      {
        id: 'ms-1',
        type: 'milestone',
        accent: 'var(--accent)',
        text: (<><strong>HackRx 6.0</strong> — LawBuddy AI achieved Top 44 accuracy ranking</>),
        time: '2024-12-01',
      },
      {
        id: 'ms-2',
        type: 'milestone',
        accent: 'var(--accent)',
        text: (<><strong>PICT Semester</strong> — Achieved CGPA 9.73/10</>),
        time: '2024-06-01',
      },
      {
        id: 'ms-3',
        type: 'milestone',
        accent: 'var(--accent)',
        text: (<><strong>LeetCode</strong> — Crossed {lcStats?.solved || '400'}+ problems solved</>),
        time: '2024-09-01',
      },
      {
        id: 'ms-4',
        type: 'milestone',
        accent: 'var(--accent)',
        text: (<><strong>BillMaster</strong> — Deployed to production, 60% faster estimation</>),
        time: '2024-08-01',
      },
      {
        id: 'ms-5',
        type: 'milestone',
        accent: 'var(--accent)',
        text: (<><strong>PICT, Pune</strong> — Enrolled in B.E. Electronics & Telecom</>),
        time: '2023-08-01',
      },
      {
        id: 'ms-6',
        type: 'milestone',
        accent: 'var(--accent)',
        text: (<><strong>Portfolio</strong> — Launched this X-style developer portfolio</>),
        time: '2026-02-22',
      },
    ];

    items.push(...milestones);

    // Sort newest first
    items.sort((a, b) => new Date(b.time) - new Date(a.time));
    return items;
  }, [posts, lcStats, ghStats]);

  const filtered = useMemo(() => {
    if (notifTab === 'all') return notifications;
    return notifications.filter((n) => n.type === notifTab);
  }, [notifications, notifTab]);

  const formatTime = (t) => {
    const d = new Date(t);
    if (isNaN(d.getTime())) return t;
    const now = new Date();
    const diff = now - d;
    if (diff < 60000) return 'just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`;
    if (diff < 604800000) return `${Math.floor(diff / 86400000)}d ago`;
    return d.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: d.getFullYear() !== now.getFullYear() ? 'numeric' : undefined });
  };

  return (
    <div className="notifications-view">
      {/* Notification tabs */}
      <div className="notif-tabs">
        {[
          { key: 'all', label: 'All' },
          { key: 'activity', label: 'Activity' },
          { key: 'milestone', label: 'Milestones' },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`notif-tab ${notifTab === tab.key ? 'active' : ''}`}
            onClick={() => setNotifTab(tab.key)}
          >
            {tab.label}
            {tab.key === 'all' && (
              <span className="notif-tab-count">{notifications.length}</span>
            )}
          </button>
        ))}
      </div>

      {/* Notification list */}
      {filtered.length > 0 ? (
        filtered.map((notif) => (
          <div className="notification-item" key={notif.id}>
            <div className="notif-accent-line" style={{ backgroundColor: notif.accent }} />
            <span className="notif-icon-svg"><FiZap size={16} /></span>
            <div className="notif-content">
              <p>{notif.text}</p>
              <span className="notif-time">{formatTime(notif.time)}</span>
            </div>
          </div>
        ))
      ) : (
        <div className="notif-empty">
          <p>No notifications in this category yet.</p>
        </div>
      )}
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
  loading,
  visitCount,
  onOpenDrawer,
}) {

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

  const showHomeLoadingState = path === '/' && loading;

  return (
    <main className="main-feed">
      {/* Sticky Header */}
      <header className="feed-header">
        <div className="feed-header-inner">
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              className="mobile-menu-btn" 
              onClick={onOpenDrawer}
            >
              <FiMenu size={22} />
            </button>
            {path !== '/' && (
              <button className="feed-back-btn" onClick={() => window.history.back()}>
                <FiArrowLeft size={20} />
              </button>
            )}
            <h2 className="feed-header-title">{headerTitle}</h2>
          </div>
          <button
            className="theme-toggle"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>
        </div>

        {/* Visit counter (Home only) */}
        {/* {path === '/' && visitCount != null && !showHomeLoadingState && (
          <div className="feed-view-counter">
            <FiBarChart2 size={14} />
            <span>{visitCount.toLocaleString()} profile visits</span>
          </div>
        )} */}
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
            loading ? (
              <FeedSkeletonLoader />
            ) : (
              <div>
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
                    <span>What&apos;s happening</span>
                  </div>
                </div>

                {/* Profile prompt */}
                <div
                  className="profile-prompt"
                  onClick={() => {
                    window.history.pushState({}, '', '/profile');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                >
                  <div className="profile-prompt-inner">
                    <FiUser size={18} className="profile-prompt-icon" />
                    <div className="profile-prompt-text">
                      <strong>Aditya Potdar</strong>
                      <span>Full-Stack Developer / AI Systems Builder / PICT Pune '27</span>
                    </div>
                    <span className="profile-prompt-cta">View Profile <FiArrowRight size={12} /></span>
                  </div>
                </div>

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
                      key={post._id || `${post.type}-${post.createdAt}-${i}`}
                      post={post}
                      index={i}
                      liked={!!likedPosts[i]}
                      onToggleLike={toggleLike}
                      avatar={ghStats?.avatar}
                    />
                  ))}
              </div>
            )
          )}

          {/* PROJECTS / EXPLORE */}
          {path === '/projects' && (
            <div className="projects-view">
              <div className="section-intro">
                <h3><FiLayers size={18} /> Featured Projects</h3>
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
            <NotificationsView posts={posts} lcStats={lcStats} ghStats={ghStats} />
          )}

          {/* BOOKMARKS */}
          {path === '/bookmarks' && (
            <div className="bookmarks-view">
              <div className="section-intro">
                <h3><FiBookmark size={18} /> Saved Resources</h3>
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
                <a
                  key={i}
                  href={bm.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bookmark-card"
                >
                  <div className="bookmark-info">
                    <h4>{bm.title}</h4>
                    <p>{bm.desc}</p>
                    <span className="bookmark-url">{bm.url}</span>
                  </div>
                  <FiExternalLink size={16} className="bookmark-ext" />
                </a>
              ))}
            </div>
          )}

          {/* SKILLS */}
          {path === '/skills' && (
            <div className="skills-view">
              <div className="section-intro">
                <h3><FiCode size={18} /> Tech Stack</h3>
                <p>Technologies I build with daily.</p>
              </div>
              {Object.entries(skillCategories).map(([cat, skills]) => (
                <div key={cat} className="skill-category">
                  <h4 className="skill-category-title">{cat}</h4>
                  <div className="skill-chips">
                    {skills.map((s) => (
                      <SkillChip key={s} name={s} icon={SKILL_ICON_MAP[s]} />
                    ))}
                  </div>
                </div>
              ))}
              <TechSphere />
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
                  <a
                    href="mailto:adityapotdar2404@gmail.com"
                    className="profile-edit-btn"
                  >
                    Contact Me
                  </a>
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
                  <StatCard label="Repositories" value={ghStats?.repos} />
                  <StatCard label="Followers" value={ghStats?.followers} />
                  <StatCard label="Stars" value={ghStats?.stars} />
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
                  <StatCard label="Total Solved" value={lcStats?.solved} />
                  <StatCard label="Easy" value={lcStats?.easy} />
                  <StatCard label="Medium" value={lcStats?.medium} />
                  <StatCard label="Hard" value={lcStats?.hard} />
                  {lcStats?.contestRating && (
                    <StatCard label="Contest Rating" value={lcStats.contestRating} />
                  )}
                  {lcStats?.streak && (
                    <StatCard label="Current Streak" value={lcStats.streak} />
                  )}
                  {lcStats?.totalActiveDays && (
                    <StatCard label="Active Days" value={lcStats.totalActiveDays} />
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
                <h3 className="profile-section-title"><FiBookOpen size={18} /> Education</h3>
                <div className="education-card">
                  <div className="education-header">
                    <h4>PICT, Pune</h4>
                    <span className="education-year">2023 — 2027</span>
                  </div>
                  <p>B.E. Electronics & Computer Engineering</p>
                  <div className="education-cgpa">
                    <span className="cgpa-badge">CGPA 9.82 / 10</span>
                  </div>
                </div>
                <div className="education-card">
                  <div className="education-header">
                    <h4>SNBP International School, Pune</h4>
                    <span className="education-year">2021 — 2023</span>
                  </div>
                  <p>HSC — 88.17%</p>
                </div>
              </div>

              {/* Achievements */}
              {/* <div className="profile-section">
                <h3 className="profile-section-title"><FiAward size={18} /> Achievements</h3>
                <div className="achievements-grid">
                  {[
                    'Top 44 at HackRx 6.0',
                    '400+ LeetCode Problems',
                    'CGPA 9.73/10 at PICT',
                    'Built 3+ Production Apps',
                    'CodeChef 3-Star Rated',
                    'Google Cloud Certified',
                  ].map((text, i) => (
                    <div className="achievement-item" key={i}>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>
              </div> */}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </main>
  );
}
