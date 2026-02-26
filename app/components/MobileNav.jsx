'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiHash, FiUser } from 'react-icons/fi';
import { SiOpenai } from 'react-icons/si';

export default function MobileNav({ path, navigate, onOpenAsk }) {
  const items = [
    { icon: FiHome, label: 'Home', p: '/' },
    { icon: FiHash, label: 'Explore', p: '/projects' },
    { icon: SiOpenai, label: 'Ask', p: '/grok', action: onOpenAsk },
    { icon: FiUser, label: 'Profile', p: '/profile' },
  ];

  return (
    <>
      {/* Fixed bottom nav */}
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

      {/* Floating compose button */}
      <motion.a
        href="mailto:adityapotdar2404@gmail.com"
        className="fab-compose"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <svg viewBox="0 0 24 24" width={24} height={24}>
          <path
            fill="white"
            d="M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6.8 17.21 6.8 21h2.394c.08-3.234.554-6.672 2.736-9.675C14.28 7.88 17.24 5.3 23 5.3V3z"
          />
        </svg>
      </motion.a>
    </>
  );
}
