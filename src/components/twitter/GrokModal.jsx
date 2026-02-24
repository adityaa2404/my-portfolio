import { AnimatePresence, motion } from 'framer-motion';
import { FiSend } from 'react-icons/fi';

export default function GrokModal({ show, messages, chatInput, setChatInput, sendMessage, onClose }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="grok-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div className="grok-card" initial={{ y: 40 }} animate={{ y: 0 }} exit={{ y: 40 }}>
            <header>
              <h3>Grok Assistant</h3>
              <button onClick={onClose}>✕</button>
            </header>
            <div className="chat-list">
              {messages.map((msg, idx) => (
                <div key={`${msg.role}-${idx}`} className={`bubble ${msg.role}`}>
                  {msg.text}
                  {msg.role === 'bot' && msg.text.includes('WhatsApp') && (
                    <div className="quick-actions">
                      <a href="https://wa.me/917745060502" target="_blank" rel="noreferrer">WhatsApp</a>
                      <a href="mailto:aditya.inv10@gmail.com">Email</a>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="chat-input">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about projects, skills, contact..."
              />
              <button onClick={sendMessage}><FiSend /></button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
