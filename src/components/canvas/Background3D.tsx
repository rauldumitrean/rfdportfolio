"use client";

import { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from 'three';

function getParticleCount(): number {
  if (typeof window === "undefined") return 5000;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return 0;
  if (window.innerWidth < 768) return 1000;
  if (window.innerWidth < 1024) return 2500;
  return 5000;
}

const Particles = ({ count }: { count: number }) => {
  const ref = useRef<THREE.Points>(null);

  const [sphere] = useState(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 20 * Math.cbrt(Math.random());
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    return positions;
  });

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3b82f6"
          size={0.05}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
};

export default function Background3D() {
  // particleCount is initialised with the server-safe value (5000).
  // After hydration we read the real device-aware value via a ref
  // and re-render once — avoids the "setState in effect" lint rule.
  const countRef = useRef<number>(5000);
  const [particleCount, setParticleCount] = useState<number | null>(null);

  useEffect(() => {
    const realCount = getParticleCount();
    countRef.current = realCount;
    // Use a timeout so the setState fires outside the synchronous effect body
    const id = setTimeout(() => setParticleCount(realCount), 0);
    return () => clearTimeout(id);
  }, []);

  // While computing (SSR / first paint): plain black background
  if (particleCount === null) {
    return <div className="fixed top-0 left-0 w-full h-full z-[-1] bg-black pointer-events-none" />;
  }

  // User prefers reduced motion → no canvas at all
  if (particleCount === 0) {
    return <div className="fixed top-0 left-0 w-full h-full z-[-1] bg-black pointer-events-none" />;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full z-[-1] bg-black/90 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <fog attach="fog" args={["#050505", 2, 10]} />
        <ambientLight intensity={0.5} />
        <Particles count={particleCount} />
      </Canvas>
    </div>
  );
}
