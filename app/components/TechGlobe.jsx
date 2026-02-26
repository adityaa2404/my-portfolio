'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls, Text, Html } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

/* ── Tech icons that orbit the globe ──────── */
const TECH_ICONS = [
  { label: 'React', color: '#61dafb', emoji: '⚛️' },
  { label: 'JavaScript', color: '#f7df1e', emoji: '🟨' },
  { label: 'Python', color: '#3776ab', emoji: '🐍' },
  { label: 'Next.js', color: '#ffffff', emoji: '▲' },
  { label: 'Node.js', color: '#68a063', emoji: '🟢' },
  { label: 'C++', color: '#00599c', emoji: '🔵' },
  { label: 'TypeScript', color: '#3178c6', emoji: '🔷' },
  { label: 'MongoDB', color: '#47a248', emoji: '🍃' },
  { label: 'Docker', color: '#2496ed', emoji: '🐳' },
  { label: 'Java', color: '#ed8b00', emoji: '☕' },
  { label: 'PostgreSQL', color: '#336791', emoji: '🐘' },
  { label: 'Git', color: '#f05032', emoji: '🔀' },
];

/* A single orbiting tech icon */
function OrbitingIcon({ label, color, emoji, index, total, orbitRadius }) {
  const groupRef = useRef();
  const baseAngle = (index / total) * Math.PI * 2;
  const tilt = ((index % 3) - 1) * 0.35;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const speed = 0.18 + index * 0.012;
    const angle = baseAngle + t * speed;
    const r = orbitRadius;
    const x = r * Math.cos(angle);
    const z = r * Math.sin(angle);
    const y = Math.sin(angle * 0.5 + index) * 0.4 + tilt;
    if (groupRef.current) {
      groupRef.current.position.set(x, y, z);
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[0.12, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          transparent
          opacity={0.7}
        />
      </mesh>
      <Text
        position={[0, 0.2, 0]}
        fontSize={0.1}
        color={color}
        anchorX="center"
        anchorY="middle"
        outlineWidth={0.01}
        outlineColor="#000000"
      >
        {label}
      </Text>
      <Html
        center
        distanceFactor={6}
        style={{
          fontSize: '16px',
          pointerEvents: 'none',
          userSelect: 'none',
          textShadow: `0 0 8px ${color}`,
        }}
      >
        {emoji}
      </Html>
    </group>
  );
}

/* Mini wireframe sphere for the center */
function MiniWireframe() {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.15;
    }
  });

  const wireLines = useMemo(() => {
    const lines = [];
    for (let lat = -60; lat <= 60; lat += 30) {
      const pts = [];
      const theta = (lat * Math.PI) / 180;
      for (let lon = 0; lon <= 360; lon += 10) {
        const phi = (lon * Math.PI) / 180;
        const r = 1.0;
        pts.push(
          new THREE.Vector3(
            r * Math.cos(theta) * Math.cos(phi),
            r * Math.sin(theta),
            r * Math.cos(theta) * Math.sin(phi)
          )
        );
      }
      lines.push(pts);
    }
    for (let lon = 0; lon < 360; lon += 45) {
      const pts = [];
      const phi = (lon * Math.PI) / 180;
      for (let lat = -90; lat <= 90; lat += 10) {
        const theta = (lat * Math.PI) / 180;
        const r = 1.0;
        pts.push(
          new THREE.Vector3(
            r * Math.cos(theta) * Math.cos(phi),
            r * Math.sin(theta),
            r * Math.cos(theta) * Math.sin(phi)
          )
        );
      }
      lines.push(pts);
    }
    return lines;
  }, []);

  return (
    <group ref={ref}>
      <Sphere args={[0.98, 32, 32]}>
        <meshStandardMaterial
          color="#1d9bf0"
          transparent
          opacity={0.04}
          roughness={1}
          side={THREE.DoubleSide}
        />
      </Sphere>
      {wireLines.map((pts, i) => (
        <line key={i}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={pts.length}
              array={new Float32Array(pts.flatMap((p) => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#1d9bf0" transparent opacity={0.15} />
        </line>
      ))}
    </group>
  );
}

function Stars() {
  const count = 200;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 16;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 16;
    }
    return arr;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

export default function TechGlobe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.5], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[5, 3, 5]} intensity={0.8} color="#1d9bf0" />
      <pointLight position={[-3, -2, -5]} intensity={0.3} color="#7856ff" />

      <Stars />
      <MiniWireframe />

      {TECH_ICONS.map((icon, i) => (
        <OrbitingIcon
          key={icon.label}
          label={icon.label}
          color={icon.color}
          emoji={icon.emoji}
          index={i}
          total={TECH_ICONS.length}
          orbitRadius={1.8}
        />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.6}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(2 * Math.PI) / 3}
      />
    </Canvas>
  );
}
