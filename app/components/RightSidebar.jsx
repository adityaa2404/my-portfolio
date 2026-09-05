'use client';

import {
  FiSearch, FiTrendingUp, FiExternalLink, FiRefreshCw,
  FiGithub, FiLinkedin, FiHeart, FiCode,
} from 'react-icons/fi';
import { SiLeetcode } from 'react-icons/si';
import { useState, useEffect, useCallback } from 'react';

const INTEREST_ICONS = {
  cricket: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>,
  smartphones: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>,
  'cars & bikes': <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>,
};

export default function RightSidebar() {
  const [searchFocused, setSearchFocused] = useState(false);
  const [techNews, setTechNews] = useState([]);
  const [interestNews, setInterestNews] = useState({});
  const [loading, setLoading] = useState(true);
  const [newsError, setNewsError] = useState(false);

  const loadNews = useCallback(async () => {
    setLoading(true);
    setNewsError(false);
    try {
      const res = await fetch('/api/news');
      if (!res.ok) throw new Error('Unable to load news');
      const data = await res.json();
      if (data.status !== 'ok' || !data.feeds) throw new Error('No news feeds available');

      const tech = data.feeds.tech || [];
      setTechNews(tech);
      setInterestNews({
        cricket: data.feeds.cricket || [],
        smartphones: data.feeds.smartphones || [],
        'cars & bikes': [...(data.feeds.cars || []), ...(data.feeds.bikes || [])].slice(0, 5),
      });
      setNewsError(tech.length === 0);
    } catch {
      /* keep whatever was already loaded */
      setNewsError(true);
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

      {/* Trending in Tech */}
      <div className="trending-panel">
        <h3 className="panel-title">
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

        {loading ? (
          <div className="trending-skeleton">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="skeleton-item">
                <div className="skeleton-line" style={{ width: '90%' }} />
                <div className="skeleton-line short" style={{ width: '60%' }} />
              </div>
            ))}
          </div>
        ) : techNews.length > 0 ? (
          techNews.map((item, i) => (
              <a
                key={i}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="trending-item"
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
              </a>
            ))
        ) : (
          <div className="trending-empty" role="status">
            {newsError ? 'Tech news is unavailable right now.' : 'No tech stories available.'}
          </div>
        )}
      </div>

      {/* My Interests */}
      <div className="interests-panel">
        <h3 className="panel-title"><FiHeart size={16} /> My Interests</h3>
        {Object.entries(interestNews).length > 0
          ? Object.entries(interestNews).map(([category, items]) => (
              <div key={category} className="interest-category">
                <div className="interest-name">
                  <span className="interest-icon">{INTEREST_ICONS[category]}</span>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </div>
                {items && items.length > 0 ? (
                  items.map((article, ai) => (
                    <a
                      key={ai}
                      href={article.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="interest-item"
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
                    </a>
                  ))
                ) : (
                  <div
                    className="interest-item"
                    style={{ padding: '6px 12px', fontSize: '13px', opacity: 0.5 }}
                  >
                    No recent updates
                  </div>
                )}
              </div>
            ))
          : [
              { name: 'Cricket' },
              { name: 'Smartphones' },
              { name: 'Cars & Bikes' },
            ].map((interest, i) => (
              <div key={i} className="interest-item">
                <div className="interest-name">{interest.name}</div>
                <div className="interest-headline">Loading...</div>
              </div>
            ))}
      </div>

      {/* Footer Links */}
      <div className="sidebar-footer-links">
        <a href="https://github.com/adityaa2404" target="_blank" rel="noopener noreferrer">
          <FiGithub size={14} /> GitHub
        </a>
        <a href="https://www.linkedin.com/in/adityapotdar24/" target="_blank" rel="noopener noreferrer">
          <FiLinkedin size={14} /> LinkedIn
        </a>
        <a href="https://leetcode.com/u/adityaapotdar/" target="_blank" rel="noopener noreferrer">
          <SiLeetcode size={13} /> LeetCode
        </a>
        <span className="footer-copy">
          <FiCode size={12} /> Built by Aditya Potdar
        </span>
      </div>
    </aside>
  );
}
