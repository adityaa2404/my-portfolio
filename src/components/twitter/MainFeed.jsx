import { motion } from 'framer-motion';
import { FiExternalLink, FiHeart, FiMoon, FiRepeat, FiShare, FiSun } from 'react-icons/fi';
import TechOrbit from './TechOrbit';
import AboutGlobe from './AboutGlobe';

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
}) {
  return (
    <main className="main-feed">
      <header className="feed-header">
        <h1>{path === '/' ? 'For you' : path.replace('/', '') || 'home'}</h1>
        <button className="theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          {theme === 'dark' ? <FiSun /> : <FiMoon />}
        </button>
      </header>

      {path === '/' && (
        <section className="feed-list">
          {posts.map((post, idx) => (
            <motion.article key={`${post.title}-${idx}`} className="tweet-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <div className="tweet-head">
                <strong>Aditya Potdar</strong>
                <span>@aaditya2404 · now</span>
              </div>
              <h3>{post.title}</h3>
              <p>{post.content}</p>
              <small>{post.tag}</small>
              <div className="tweet-actions">
                <button><FiHeart /> 24</button>
                <button><FiRepeat /> 8</button>
                <button><FiShare /> 3</button>
              </div>
            </motion.article>
          ))}

          <AboutGlobe />
          <div className="footer">Built with ❤️ by Aditya Potdar</div>
        </section>
      )}

      {path === '/projects' && (
        <section className="grid-view">
          {projectCards.map((project) => (
            <article key={project.title} className="tweet-card">
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <small>{project.stack}</small>
              <div className="metric">📈 {project.metric}</div>
              <div className="links">
                <a href={project.github} target="_blank" rel="noreferrer">GitHub <FiExternalLink /></a>
                <a href={project.demo} target="_blank" rel="noreferrer">Live Demo <FiExternalLink /></a>
              </div>
            </article>
          ))}
        </section>
      )}

      {path === '/notifications' && (
        <section className="feed-list">
          {['Someone starred your GitHub repo', 'You solved 5 LeetCode problems today', 'Your LawBuddy AI demo got 12 new visits'].map((note) => (
            <article key={note} className="tweet-card"><p>{note}</p></article>
          ))}
        </section>
      )}

      {path === '/bookmarks' && (
        <section className="feed-list">
          <article className="tweet-card"><p>Saved: BillMaster architecture deep dive.</p></article>
          <article className="tweet-card"><p>Saved: LawBuddy AI clause detection benchmark results.</p></article>
        </section>
      )}

      {path === '/skills' && (
        <section className="feed-list">
          <article className="tweet-card orbit-box">
            <h3>Tech Stack Orbit</h3>
            <TechOrbit techOrbit={techOrbit} />
          </article>
          {Object.entries(skillCategories).map(([title, skills]) => (
            <article key={title} className="tweet-card">
              <h3>{title}</h3>
              <p>{skills.join(' • ')}</p>
            </article>
          ))}
        </section>
      )}

      {path === '/profile' && (
        <section className="feed-list">
          <article className="tweet-card">
            <div className="profile-head">
              <img src={ghStats?.avatar || 'https://avatars.githubusercontent.com/u/9919?v=4'} alt="Aditya Potdar" />
              <div>
                <h3>Aditya Dattatray Potdar</h3>
                <p>B.E. Electronics and Computer Engineering • PICT (2023–2027) • CGPA 9.73 • Pune, Maharashtra</p>
              </div>
            </div>
          </article>
          <article className="tweet-card">
            <h3>📊 GitHub Stats</h3>
            <p>Followers: {ghStats?.followers ?? '—'} • Repos: {ghStats?.repos ?? '—'} • Stars: {ghStats?.stars ?? '—'}</p>
            <img className="graph" src="https://ghchart.rshah.org/adityapotdar24" alt="Contribution graph" />
          </article>
          <article className="tweet-card">
            <h3>🧠 LeetCode Stats</h3>
            <p>Total Solved: {lcStats?.solved ?? '400+'}</p>
            <p>Easy: {lcStats?.easy ?? '—'} • Medium: {lcStats?.medium ?? '—'} • Hard: {lcStats?.hard ?? '—'}</p>
            <p>Ranking: {lcStats?.ranking ?? '—'}</p>
          </article>
        </section>
      )}
    </main>
  );
}
