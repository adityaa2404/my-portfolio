'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Text, Float, OrbitControls } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

const colors = [
  '#1d9bf0', '#7856ff', '#f91880', '#00ba7c', '#ffd400',
  '#ff7a00', '#6366f1', '#a855f7', '#14b8a6', '#f43f5e',
  '#3b82f6', '#8b5cf6', '#06b6d4', '#ef4444',
];

function TechSphere({ label, position, color, index }) {
  const meshRef = useRef();
  const textRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.position.y =
        position[1] + Math.sin(t * 0.8 + index * 0.5) * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={meshRef} position={position}>
        <mesh>
          <sphereGeometry args={[0.35, 32, 32]} />
          <meshStandardMaterial
            color={color}
            roughness={0.25}
            metalness={0.6}
            emissive={color}
            emissiveIntensity={0.15}
          />
        </mesh>
        <Text
          ref={textRef}
          position={[0, 0, 0.4]}
          fontSize={0.14}
          color="white"
          anchorX="center"
          anchorY="middle"
          font="/fonts/inter-bold.woff"
          outlineWidth={0.02}
          outlineColor="black"
        >
          {label}
        </Text>
      </group>
    </Float>
  );
}

function ParticleField() {
  const count = 200;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    return arr;
  }, []);

  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#1d9bf0" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

function OrbitalRing({ radius, tilt, speed }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.z = clock.getElapsedTime() * speed;
    }
  });

  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0));
    }
    return pts;
  }, [radius]);

  return (
    <group rotation={[tilt, 0, 0]} ref={ref}>
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#1d9bf0" transparent opacity={0.15} />
      </line>
    </group>
  );
}

export default function TechOrbit({ items }) {
  const spherePositions = useMemo(() => {
    return items.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / items.length);
      const theta = Math.sqrt(items.length * Math.PI) * phi;
      const r = 2.8;
      return [
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi),
      ];
    });
  }, [items]);

  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 50 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.3} color="#7856ff" />

      <ParticleField />
      <OrbitalRing radius={3.2} tilt={0.4} speed={0.05} />
      <OrbitalRing radius={3.5} tilt={-0.6} speed={-0.03} />
      <OrbitalRing radius={2.8} tilt={1.2} speed={0.04} />

      {items.map((label, i) => (
        <TechSphere
          key={label}
          label={label}
          position={spherePositions[i]}
          color={colors[i % colors.length]}
          index={i}
        />
      ))}

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.8}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={(3 * Math.PI) / 4}
      />
    </Canvas>
  );
}
