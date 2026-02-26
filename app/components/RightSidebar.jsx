'use client';

import { motion } from 'framer-motion';
import { FiSearch, FiTrendingUp, FiExternalLink, FiRefreshCw } from 'react-icons/fi';
import { useState, useEffect, useCallback } from 'react';

const INTEREST_ICONS = {
  cricket: '🏏',
  smartphones: '📱',
  cars: '🚗',
  bikes: '🏍',
};

export default function RightSidebar() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [techNews, setTechNews] = useState([]);
  const [interestNews, setInterestNews] = useState({});
  const [loading, setLoading] = useState(true);

  const loadNews = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/news');
      const data = await res.json();
      if (data.status === 'ok' && data.feeds) {
        setTechNews(data.feeds.tech || []);
        setInterestNews({
          cricket: data.feeds.cricket || [],
          smartphones: data.feeds.smartphones || [],
          cars: data.feeds.cars || [],
          bikes: data.feeds.bikes || [],
        });
      }
    } catch {
      /* keep whatever was already loaded */
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNews();
    const interval = setInterval(loadNews, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, [loadNews]);

  return (
    <aside className="right-sidebar">
      {/* Search */}
      <div className={`search-box ${searchFocused ? 'focused' : ''}`}>
        <FiSearch size={16} className="search-icon" />
        <input
          type="text"
          placeholder="Search portfolio"
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
        />
      </div>

      {/* Trending in Tech — Live RSS Feed */}
      <motion.div
        className="trending-panel"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="panel-title" style={{ display: 'flex', alignItems: 'center' }}>
          <FiTrendingUp size={16} /> Trending in Tech
          <button
            className="refresh-btn"
            onClick={loadNews}
            title="Refresh news"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--accent)',
              marginLeft: 'auto',
              padding: '4px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <FiRefreshCw size={14} className={loading ? 'spin' : ''} />
          </button>
        </h3>

        {techNews.length > 0
          ? techNews.map((item, i) => (
              <motion.a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="trending-item"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                whileHover={{ x: 4 }}
              >
                <div className="trending-rank">#{i + 1}</div>
                <div className="trending-info">
                  <span className="trending-topic">{item.title}</span>
                  <span className="trending-meta">
                    {item.pubDate
                      ? new Date(item.pubDate).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })
                      : 'Recent'}
                  </span>
                </div>
                <FiExternalLink size={12} className="trending-ext" />
              </motion.a>
            ))
          : (
            <div className="trending-skeleton">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="skeleton-item">
                  <div className="skeleton-line" style={{ width: '90%' }} />
                  <div className="skeleton-line short" style={{ width: '60%' }} />
                </div>
              ))}
            </div>
          )}
      </motion.div>

      {/* My Interests — Live Feeds */}
      <motion.div
        className="interests-panel"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="panel-title">My Interests</h3>
        {Object.entries(interestNews).length > 0
          ? Object.entries(interestNews).map(([category, items], ci) => (
              <motion.div
                key={category}
                className="interest-category"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + ci * 0.1 }}
              >
                <div className="interest-name">
                  {INTEREST_ICONS[category] || '📰'}{' '}
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </div>
                {items && items.length > 0 ? (
                  items.map((article, ai) => (
                    <motion.a
                      key={ai}
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="interest-item"
                      whileHover={{ backgroundColor: 'var(--hover)' }}
                      style={{
                        display: 'block',
                        padding: '6px 12px',
                        textDecoration: 'none',
                        color: 'inherit',
                        fontSize: '13px',
                        lineHeight: '1.4',
                        borderRadius: '8px',
                      }}
                    >
                      <div className="interest-headline">{article.title}</div>
                    </motion.a>
                  ))
                ) : (
                  <div
                    className="interest-item"
                    style={{ padding: '6px 12px', fontSize: '13px', opacity: 0.5 }}
                  >
                    No recent updates
                  </div>
                )}
              </motion.div>
            ))
          : [
              { name: '🏏 Cricket', headline: 'Loading latest cricket news...' },
              { name: '📱 Smartphones', headline: 'Loading smartphone updates...' },
              { name: '🚗 Cars', headline: 'Loading car news...' },
              { name: '🏍 Bikes', headline: 'Loading bike news...' },
            ].map((interest, i) => (
              <motion.div
                key={i}
                className="interest-item"
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + i * 0.08 }}
                whileHover={{ backgroundColor: 'var(--hover)' }}
              >
                <div className="interest-name">{interest.name}</div>
                <div className="interest-headline">{interest.headline}</div>
              </motion.div>
            ))}
      </motion.div>

      {/* Footer Links */}
      <div className="sidebar-footer-links">
        <a href="https://github.com/adityaa2404" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/adityapotdar24/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="https://leetcode.com/u/adityaapotdar/"
          target="_blank"
          rel="noopener noreferrer"
        >
          LeetCode
        </a>
        <span className="footer-copy">© 2025 Aditya Potdar</span>
      </div>
    </aside>
  );
}
