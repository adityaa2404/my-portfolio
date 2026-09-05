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
      {/* X Logo */}
      <div className="sidebar-logo">
        <svg viewBox="0 0 24 24" width={30} height={30} aria-label="X logo">
          <path
            fill="var(--text-primary)"
            d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
          />
        </svg>
      </div>

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
