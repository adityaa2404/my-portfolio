'use client';

import { motion } from 'framer-motion';
import {
  FiHome,
  FiHash,
  FiBell,
  FiMessageCircle,
  FiBookmark,
  FiCode,
  FiUser,
  FiMoreHorizontal,
  FiSearch,
} from 'react-icons/fi';

const iconMap = {
  home: FiHome,
  explore: FiHash,
  bell: FiBell,
  chat: FiMessageCircle,
  grok: FiSearch,
  bookmark: FiBookmark,
  code: FiCode,
  user: FiUser,
  more: FiMoreHorizontal,
};

export default function LeftSidebar({ navItems, path, onNavClick, avatar, notifCount = 0 }) {
  return (
    <aside className="left-sidebar" role="navigation">
      {/* Brand logo */}
      <div className="sidebar-logo" aria-hidden="true" />

      {/* Nav Items */}
      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive =
            !item.modal && !item.externalLink && item.path === path;
          return (
            <button
              key={item.label}
              className={`nav-item ${isActive ? 'active' : ''}`}
              onClick={() => onNavClick(item)}
            >
              <span className="nav-icon-wrap">
                {Icon && <Icon size={24} />}
                {item.icon === 'bell' && notifCount > 0 && (
                  <span className="nav-notif-badge">{notifCount > 9 ? '9+' : notifCount}</span>
                )}
                {isActive && (
                  <motion.span
                    className="nav-active-dot"
                    layoutId="navDot"
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}
              </span>
              <span className="nav-label">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Hire Me button */}
      <a href="mailto:adityapotdar2404@gmail.com" className="sidebar-post-btn">
        Hire Me
      </a>

      {/* User identity block */}
      <div className="sidebar-identity">
        <div className="identity-avatar">
          {avatar ? (
            <img src={avatar} alt="Aditya Potdar" />
          ) : (
            <div className="identity-avatar-placeholder">AP</div>
          )}
        </div>
        <div className="identity-info">
          <span className="identity-name">Aditya Potdar</span>
          <span className="identity-handle">@adityaa2404</span>
        </div>
        <FiMoreHorizontal size={18} className="identity-more" />
      </div>
    </aside>
  );
}
