'use client';

import { motion, AnimatePresence } from 'framer-motion';
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
        <FiPlus size={24} color="white" />
      </motion.a>
    </>
  );
}
