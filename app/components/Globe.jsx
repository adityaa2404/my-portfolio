'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, OrbitControls } from '@react-three/drei';
import { useRef, useMemo } from 'react';
import * as THREE from 'three';

/* Wireframe globe with India highlight and Pune pin */

function WireframeGlobe() {
  const globeRef = useRef();
  const glowRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.15;
    }
  });

  // Generate latitude and longitude lines
  const wireLines = useMemo(() => {
    const lines = [];
    // Latitude lines
    for (let lat = -80; lat <= 80; lat += 20) {
      const pts = [];
      const theta = (lat * Math.PI) / 180;
      for (let lon = 0; lon <= 360; lon += 5) {
        const phi = (lon * Math.PI) / 180;
        const r = 1.5;
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
    // Longitude lines
    for (let lon = 0; lon < 360; lon += 30) {
      const pts = [];
      const phi = (lon * Math.PI) / 180;
      for (let lat = -90; lat <= 90; lat += 5) {
        const theta = (lat * Math.PI) / 180;
        const r = 1.5;
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

  // India approximate bounding box highlight (lat 8°-35°, lon 68°-97°)
  const indiaHighlight = useMemo(() => {
    const pts = [];
    const r = 1.52;
    // Bottom edge
    for (let lon = 68; lon <= 97; lon += 2) {
      const phi = (lon * Math.PI) / 180;
      const theta = (8 * Math.PI) / 180;
      pts.push(new THREE.Vector3(r * Math.cos(theta) * Math.cos(phi), r * Math.sin(theta), r * Math.cos(theta) * Math.sin(phi)));
    }
    // Right edge
    for (let lat = 8; lat <= 35; lat += 2) {
      const phi = (97 * Math.PI) / 180;
      const theta = (lat * Math.PI) / 180;
      pts.push(new THREE.Vector3(r * Math.cos(theta) * Math.cos(phi), r * Math.sin(theta), r * Math.cos(theta) * Math.sin(phi)));
    }
    // Top edge
    for (let lon = 97; lon >= 68; lon -= 2) {
      const phi = (lon * Math.PI) / 180;
      const theta = (35 * Math.PI) / 180;
      pts.push(new THREE.Vector3(r * Math.cos(theta) * Math.cos(phi), r * Math.sin(theta), r * Math.cos(theta) * Math.sin(phi)));
    }
    // Left edge
    for (let lat = 35; lat >= 8; lat -= 2) {
      const phi = (68 * Math.PI) / 180;
      const theta = (lat * Math.PI) / 180;
      pts.push(new THREE.Vector3(r * Math.cos(theta) * Math.cos(phi), r * Math.sin(theta), r * Math.cos(theta) * Math.sin(phi)));
    }
    return pts;
  }, []);

  // Pune pin (18.52°N, 73.86°E)
  const punePos = useMemo(() => {
    const lat = (18.52 * Math.PI) / 180;
    const lon = (73.86 * Math.PI) / 180;
    const r = 1.55;
    return new THREE.Vector3(
      r * Math.cos(lat) * Math.cos(lon),
      r * Math.sin(lat),
      r * Math.cos(lat) * Math.sin(lon)
    );
  }, []);

  return (
    <group ref={globeRef}>
      {/* Translucent sphere */}
      <Sphere args={[1.48, 48, 48]}>
        <meshStandardMaterial
          color="#1d9bf0"
          transparent
          opacity={0.06}
          roughness={1}
          side={THREE.DoubleSide}
        />
      </Sphere>

      {/* Wireframe lines */}
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
          <lineBasicMaterial color="#1d9bf0" transparent opacity={0.12} />
        </line>
      ))}

      {/* India highlight */}
      <line>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={indiaHighlight.length}
            array={new Float32Array(indiaHighlight.flatMap((p) => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#1d9bf0" transparent opacity={0.6} linewidth={2} />
      </line>

      {/* Pune pin */}
      <mesh position={punePos}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshStandardMaterial color="#f91880" emissive="#f91880" emissiveIntensity={0.8} />
      </mesh>

      {/* Glow ring around Pune */}
      <mesh position={punePos}>
        <ringGeometry args={[0.06, 0.09, 32]} />
        <meshBasicMaterial color="#f91880" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

function Stars() {
  const count = 300;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 20;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 20;
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
      <pointsMaterial size={0.02} color="#ffffff" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

export default function Globe() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 3, 5]} intensity={0.8} color="#1d9bf0" />
      <pointLight position={[-3, -2, -5]} intensity={0.3} color="#7856ff" />

      <Stars />
      <WireframeGlobe />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(2 * Math.PI) / 3}
      />
    </Canvas>
  );
}
