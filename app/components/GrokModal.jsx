'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSend, FiPhone, FiMail } from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';
import { useRef, useEffect } from 'react';

export default function GrokModal({
  show,
  messages,
  chatInput,
  setChatInput,
  sendMessage,
  onClose,
}) {
  const endRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (show) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [show]);

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            className="grok-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          {/* Modal */}
          <motion.div
            className="grok-modal"
            initial={{ opacity: 0, scale: 0.92, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 40 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          >
            {/* Header */}
            <div className="grok-header">
              <div className="grok-header-left">
                <span className="grok-logo">✦</span>
                <span className="grok-title">Grok</span>
                <span className="grok-subtitle">Ask about Aditya</span>
              </div>
              <button className="grok-close" onClick={onClose}>
                <FiX size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="grok-messages">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  className={`grok-msg ${msg.role}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {msg.role === 'bot' && <span className="grok-msg-icon">✦</span>}
                  <div className="grok-msg-content">
                    <p>{msg.text}</p>
                    {msg.quickActions && (
                      <div className="grok-quick-actions">
                        <a
                          href="https://wa.me/917745060502"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="grok-action-btn whatsapp"
                        >
                          <SiWhatsapp size={16} /> WhatsApp
                        </a>
                        <a
                          href="mailto:adityapotdar2404@gmail.com"
                          className="grok-action-btn email"
                        >
                          <FiMail size={16} /> Email
                        </a>
                        <a
                          href="tel:+917745060502"
                          className="grok-action-btn phone"
                        >
                          <FiPhone size={16} /> Call
                        </a>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
              <div ref={endRef} />
            </div>

            {/* Suggested prompts */}
            {messages.length <= 2 && (
              <div className="grok-suggestions">
                {[
                  'What are his skills?',
                  'Tell me about his projects',
                  'How to contact him?',
                  'What is his education?',
                ].map((q, i) => (
                  <motion.button
                    key={i}
                    className="grok-suggestion-chip"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.08 }}
                    onClick={() => {
                      setChatInput(q);
                      setTimeout(sendMessage, 50);
                    }}
                  >
                    {q}
                  </motion.button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="grok-input-area">
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask Grok about Aditya..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={handleKey}
              />
              <button className="grok-send" onClick={sendMessage}>
                <FiSend size={18} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
