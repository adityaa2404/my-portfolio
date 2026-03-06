'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Sphere, OrbitControls, Html } from '@react-three/drei';
import { useRef, useMemo, Suspense, useState } from 'react';
import * as THREE from 'three';
import { TextureLoader } from 'three';

/* Realistic Earth Globe with Pune pin (Profile only) */

// Use reliable NASA/public CDN texture URLs
const EARTH_TEXTURE = 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg';
const EARTH_BUMP = 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg';
const EARTH_SPECULAR = 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg';

function EarthGlobe() {
  const globeRef = useRef();
  const puneMarkerRef = useRef();
  const puneGroupRef = useRef();
  const [pinVisible, setPinVisible] = useState(true);

  // Load Earth textures from Three.js examples (reliable source)
  const [earthMap, bumpMap, specMap] = useLoader(TextureLoader, [
    EARTH_TEXTURE,
    EARTH_BUMP,
    EARTH_SPECULAR,
  ]);

  useFrame(({ clock, camera }) => {
    const t = clock.getElapsedTime();
    if (globeRef.current) {
      globeRef.current.rotation.y = t * 0.08;
    }
    // Pulse effect on Pune marker
    if (puneMarkerRef.current) {
      const scale = 1 + Math.sin(t * 3) * 0.2;
      puneMarkerRef.current.scale.setScalar(scale);
    }
    
    // Check if Pune is facing the camera
    if (puneGroupRef.current && globeRef.current) {
      const pinWorldPos = new THREE.Vector3();
      puneGroupRef.current.getWorldPosition(pinWorldPos);
      
      const globeWorldPos = new THREE.Vector3();
      globeRef.current.getWorldPosition(globeWorldPos);
      
      // Direction from globe center to pin
      const pinDir = pinWorldPos.clone().sub(globeWorldPos).normalize();
      // Direction from globe center to camera
      const camDir = camera.position.clone().sub(globeWorldPos).normalize();
      
      // Dot product: > 0 means pin is facing camera
      const dot = pinDir.dot(camDir);
      setPinVisible(dot > 0.15);
    }
  });

  // Pune coordinates: 18°32'N, 73°51'E
  const punePos = useMemo(() => {
    const lat = 18.5333;
    const lon = 73.85;
    // Convert to radians with proper Earth texture mapping
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);
    const r = 1.52;
    return new THREE.Vector3(
      -r * Math.sin(phi) * Math.cos(theta),
      r * Math.cos(phi),
      r * Math.sin(phi) * Math.sin(theta)
    );
  }, []);

  return (
    <group ref={globeRef}>
      {/* Earth sphere with realistic texture */}
      <Sphere args={[1.5, 64, 64]}>
        <meshPhongMaterial
          map={earthMap}
          bumpMap={bumpMap}
          bumpScale={0.05}
          specularMap={specMap}
          specular={new THREE.Color('#666666')}
          shininess={15}
          emissive={new THREE.Color('#111122')}
          emissiveIntensity={0.3}
        />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere args={[1.55, 64, 64]}>
        <meshBasicMaterial
          color="#6bb8ff"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Pune pin marker */}
      <group ref={puneGroupRef} position={punePos} visible={pinVisible}>
        {/* Main pin dot */}
        <mesh ref={puneMarkerRef}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshStandardMaterial 
            color="#ff3366" 
            emissive="#ff3366" 
            emissiveIntensity={1} 
          />
        </mesh>
        
        {/* Outer glow ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.05, 0.08, 32]} />
          <meshBasicMaterial 
            color="#ff3366" 
            transparent 
            opacity={0.5} 
            side={THREE.DoubleSide} 
          />
        </mesh>

        {/* Second pulse ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.09, 0.11, 32]} />
          <meshBasicMaterial 
            color="#ff3366" 
            transparent 
            opacity={0.25} 
            side={THREE.DoubleSide} 
          />
        </mesh>

        {/* Label */}
        <Html
          position={[0.15, 0.1, 0]}
          style={{
            color: '#fff',
            fontSize: '11px',
            fontWeight: '700',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            background: 'rgba(0,0,0,0.7)',
            padding: '3px 8px',
            borderRadius: '6px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
            border: '1px solid rgba(255,51,102,0.5)',
          }}
          center
        >
          📍 Pune, India
        </Html>
      </group>
    </group>
  );
}

function Stars() {
  const count = 400;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 25;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 25;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 25;
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
      <pointsMaterial size={0.025} color="#ffffff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function GlobeFallback() {
  const ref = useRef();
  
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <group ref={ref}>
      <Sphere args={[1.5, 32, 32]}>
        <meshBasicMaterial color="#1a3a5c" wireframe />
      </Sphere>
    </group>
  );
}

export default function Globe() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 4], fov: 45 }}
      style={{ width: '100%', height: '100%' }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={1.2} />
      <directionalLight position={[5, 3, 5]} intensity={2.0} color="#ffffff" />
      <directionalLight position={[-3, -2, -3]} intensity={0.8} color="#87ceeb" />
      <pointLight position={[-5, -3, -5]} intensity={0.5} color="#4da6ff" />

      <Stars />
      
      <Suspense fallback={<GlobeFallback />}>
        <EarthGlobe />
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate
        autoRotateSpeed={0.4}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={(2 * Math.PI) / 3}
      />
    </Canvas>
  );
}
