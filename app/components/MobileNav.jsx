'use client';

import { motion } from 'framer-motion';
import { FiHome, FiHash, FiUser, FiSearch, FiPlus } from 'react-icons/fi';

export default function MobileNav({ path, navigate, onOpenAsk }) {
  const items = [
    { icon: FiHome, label: 'Home', p: '/' },
    { icon: FiHash, label: 'Explore', p: '/projects' },
    { icon: FiSearch, label: 'Ask', p: '/grok', action: onOpenAsk },
    { icon: FiUser, label: 'Profile', p: '/profile' },
  ];

  return (
    <>
      <nav className="mobile-nav">
        {items.map(({ icon: Icon, label, p, action }) => {
          const active = p === path;
          return (
            <button
              key={label}
              className={`mobile-nav-item ${active ? 'active' : ''}`}
              onClick={() => (action ? action() : navigate(p))}
              aria-label={label}
            >
              <Icon size={22} />
              {active && (
                <motion.span
                  className="mobile-active-dot"
                  layoutId="mobileNavDot"
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </nav>

      <a href="mailto:adityapotdar2404@gmail.com" className="fab-compose">
        <FiPlus size={24} color="white" />
      </a>
    </>
  );
}
