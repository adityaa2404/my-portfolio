import { motion } from 'framer-motion';
import { useMemo, useState } from 'react';

export default function TechOrbit({ techOrbit }) {
  const [hovered, setHovered] = useState(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const positioned = useMemo(() => {
    return techOrbit.map((skill, index) => {
      const angle = (index / techOrbit.length) * Math.PI * 2;
      const radius = 90 + (index % 4) * 15;
      return {
        skill,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        delay: index * 0.08,
      };
    });
  }, [techOrbit]);

  return (
    <div
      className="orbital-wrap"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const rx = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
        const ry = ((e.clientY - rect.top) / rect.height - 0.5) * -14;
        setTilt({ x: rx, y: ry });
      }}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
    >
      <motion.div
        className="orbit-core"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 24, ease: 'linear' }}
        style={{ transform: `perspective(800px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg)` }}
      >
        {positioned.map((node) => (
          <motion.div
            key={node.skill}
            className={`orbit-node ${hovered === node.skill ? 'active' : ''}`}
            style={{ left: `calc(50% + ${node.x}px)`, top: `calc(50% + ${node.y}px)` }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: hovered === node.skill ? 1.2 : 1 }}
            transition={{ delay: node.delay, duration: 0.35 }}
            onMouseEnter={() => setHovered(node.skill)}
            onMouseLeave={() => setHovered(null)}
          >
            {node.skill}
          </motion.div>
        ))}
      </motion.div>
      <div className="orbit-label">{hovered ? `${hovered} • actively used in projects` : 'Hover a tech sphere'}</div>
    </div>
  );
}
