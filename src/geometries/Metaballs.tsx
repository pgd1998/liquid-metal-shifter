import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Sphere } from '@react-three/drei';

interface MetaballProps {
  position: [number, number, number];
  scale: number;
  material: THREE.Material;
  index: number;
}

function Metaball({ position, scale, material, index }: MetaballProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const offset = index * 0.5;
      
      meshRef.current.position.x = Math.cos(time * 0.8 + offset) * (2 + Math.sin(time * 0.3) * 0.5);
      meshRef.current.position.z = Math.sin(time * 0.8 + offset) * (2 + Math.sin(time * 0.3) * 0.5);
      meshRef.current.position.y = Math.sin(time * 1.5 + offset) * 0.8;
      meshRef.current.scale.setScalar(scale + Math.sin(time * 3 + offset) * 0.1);
    }
  });

  return (
    <Sphere ref={meshRef} position={position} args={[1, 32, 32]}>
      <primitive object={material} attach="material" />
    </Sphere>
  );
}

interface MetaballsProps {
  material: THREE.Material;
  numBalls: number;
}

export default function Metaballs({ material, numBalls }: MetaballsProps) {
  const groupRef = useRef<THREE.Group>(null);

  const metaballs = React.useMemo(() => {
    const balls = [];
    const radius = 2;
    
    for (let i = 0; i < numBalls; i++) {
      const angle = (i / numBalls) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 2;
      
      balls.push({
        position: [x, y, z] as [number, number, number],
        scale: 0.8 + Math.random() * 0.4,
        id: i
      });
    }
    
    return balls;
  }, [numBalls]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {metaballs.map((ball) => (
        <Metaball
          key={ball.id}
          position={ball.position}
          scale={ball.scale}
          material={material}
          index={ball.id}
        />
      ))}
    </group>
  );
}