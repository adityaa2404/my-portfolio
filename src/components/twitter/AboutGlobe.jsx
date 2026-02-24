import { motion } from 'framer-motion';

export default function AboutGlobe() {
  return (
    <section className="tweet-card about-globe">
      <h3>🌍 About Finale — Global mindset, rooted in Pune</h3>
      <div className="globe-stage">
        <motion.div
          className="globe"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
        >
          <span className="lat lat-1" />
          <span className="lat lat-2" />
          <span className="lng lng-1" />
          <span className="lng lng-2" />
          <motion.span
            className="india-highlight"
            animate={{ opacity: [0.2, 1, 0.4], scale: [0.9, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 3 }}
          />
          <motion.span
            className="pune-pin"
            animate={{ y: [0, -6, 0], boxShadow: ['0 0 0 rgba(29,155,240,0.2)', '0 0 20px rgba(29,155,240,0.9)', '0 0 0 rgba(29,155,240,0.2)'] }}
            transition={{ repeat: Infinity, duration: 2.2 }}
          />
        </motion.div>
      </div>
      <div className="globe-steps">
        <span>1) Rotate globe</span>
        <span>2) Zoom to India</span>
        <span>3) Pune, Maharashtra pin drop</span>
      </div>
    </section>
  );
}
