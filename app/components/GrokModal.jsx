'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiSend, FiPhone, FiMail } from 'react-icons/fi';
import { SiWhatsapp } from 'react-icons/si';
import { useRef, useEffect, useState, useCallback } from 'react';

export default function GrokModal({ show, onClose }) {
  const endRef = useRef(null);
  const inputRef = useRef(null);
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Ask anything about Aditya Potdar — skills, projects, education, or how to connect!' },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (show) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [show]);

  const sendMessage = useCallback(async (overrideText) => {
    const text = (overrideText || chatInput).trim();
    if (!text) return;

    const userMsg = { role: 'user', text };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setChatInput('');
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.filter((m) => m.role === 'user' || m.role === 'bot').map((m) => ({
            role: m.role === 'bot' ? 'model' : 'user',
            text: m.text,
          })),
        }),
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: data.reply || "Sorry, I couldn't generate a response.",
          quickActions: data.quickActions || false,
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          text: "I'm having trouble connecting right now. You can reach Aditya at adityapotdar2404@gmail.com or WhatsApp .",
          quickActions: true,
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [chatInput, messages]);

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
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            {/* Header */}
            <div className="grok-header">
              <div className="grok-header-left">
                <span className="grok-logo">✦</span>
                <span className="grok-title">Ask</span>
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
              {isTyping && (
                <motion.div
                  className="grok-msg bot"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <span className="grok-msg-icon">✦</span>
                  <div className="grok-msg-content">
                    <p className="typing-indicator">
                      <span className="dot" />
                      <span className="dot" />
                      <span className="dot" />
                    </p>
                  </div>
                </motion.div>
              )}
              <div ref={endRef} />
            </div>

            {/* Suggested prompts */}
            {messages.length <= 2 && !isTyping && (
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
                    onClick={() => sendMessage(q)}
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
                placeholder="Ask anything about Aditya..."
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={handleKey}
                disabled={isTyping}
              />
              <button className="grok-send" onClick={() => sendMessage()} disabled={isTyping}>
                <FiSend size={18} />
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
