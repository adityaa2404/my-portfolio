'use client';

import { motion } from 'framer-motion';
import { FiSearch, FiTrendingUp, FiExternalLink } from 'react-icons/fi';
import { useState } from 'react';

export default function RightSidebar({ trending, interestBlocks }) {
  const [searchFocused, setSearchFocused] = useState(false);

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
      <motion.div
        className="trending-panel"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className="panel-title">
          <FiTrendingUp size={16} /> Trending in Tech
        </h3>
        {trending && trending.length > 0 ? (
          trending.map((item, i) => (
            <motion.a
              key={item.objectID || i}
              href={item.url || `https://news.ycombinator.com/item?id=${item.objectID}`}
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
                  {item.points} points · {item.num_comments} comments
                </span>
              </div>
              <FiExternalLink size={12} className="trending-ext" />
            </motion.a>
          ))
        ) : (
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

      {/* My Interests */}
      <motion.div
        className="interests-panel"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="panel-title">My Interests</h3>
        {interestBlocks.map((interest, i) => (
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
          href="https://leetcode.com/u/aaditya2404/"
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
