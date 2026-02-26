'use client';

import { motion, AnimatePresence } from 'framer-motion';
import {
  FiHome,
  FiHash,
  FiBell,
  FiMessageCircle,
  FiBookmark,
  FiCode,
  FiUser,
  FiMoreHorizontal,
  FiSun,
  FiMoon,
} from 'react-icons/fi';
import { SiOpenai } from 'react-icons/si';
import { useState } from 'react';

const iconMap = {
  home: FiHome,
  explore: FiHash,
  bell: FiBell,
  chat: FiMessageCircle,
  grok: SiOpenai,
  bookmark: FiBookmark,
  code: FiCode,
  user: FiUser,
  more: FiMoreHorizontal,
};

export default function LeftSidebar({ navItems, path, onNavClick, avatar }) {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <aside className="left-sidebar" role="navigation">
      {/* Twitter X Logo */}
      <motion.div
        className="sidebar-logo"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg viewBox="0 0 24 24" width={30} height={30} aria-label="X logo">
          <path
            fill="var(--text)"
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
          />
        </svg>
      </motion.div>

      {/* Nav Items */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive =
            !item.modal && !item.externalLink && item.path === path;
          return (
            <motion.button
              key={item.label}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onNavClick(item)}
              onMouseEnter={() => setHoveredItem(item.label)}
              onMouseLeave={() => setHoveredItem(null)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            >
              <span className="nav-icon-wrap">
                {Icon && <Icon size={24} />}
                {isActive && (
                  <motion.span
                    className="nav-active-dot"
                    layoutId="navDot"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </span>
              <span className="nav-label">{item.label}</span>
              <AnimatePresence>
                {hoveredItem === item.label && (
                  <motion.span
                    className="nav-hover-bg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.15 }}
                  />
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </nav>

      {/* Post / Hire Me button */}
      <motion.a
        href="mailto:adityapotdar2404@gmail.com"
        className="sidebar-post-btn"
        whileHover={{ scale: 1.03, boxShadow: '0 4px 20px rgba(29,155,240,0.35)' }}
        whileTap={{ scale: 0.97 }}
      >
        Hire Me
      </motion.a>

      {/* User identity block */}
      <motion.div className="sidebar-identity" whileHover={{ backgroundColor: 'var(--hover)' }}>
        <div className="identity-avatar">
          {avatar ? (
            <img src={avatar} alt="Aditya Potdar" />
          ) : (
            <div className="identity-avatar-placeholder">AP</div>
          )}
        </div>
        <div className="identity-info">
          <span className="identity-name">Aditya Potdar</span>
          <span className="identity-handle">@aaditya2404</span>
        </div>
        <FiMoreHorizontal size={18} className="identity-more" />
      </motion.div>
    </aside>
  );
}
