import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface TeardropProps {
  position: [number, number, number];
  scale: number;
  material: THREE.Material;
  index: number;
}

function Teardrop({ position, scale, material, index }: TeardropProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 32, 32);
    const positionAttribute = geo.getAttribute('position');
    
    // Deform sphere into teardrop shape
    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      const z = positionAttribute.getZ(i);
      
      // Create teardrop by stretching top and pinching bottom
      const heightFactor = (y + 1) / 2; // 0 to 1 from bottom to top
      const taperFactor = Math.pow(heightFactor, 0.7);
      const stretchFactor = 1 + heightFactor * 0.8;
      
      positionAttribute.setXYZ(
        i,
        x * taperFactor,
        y * stretchFactor + Math.pow(heightFactor, 3) * 0.5,
        z * taperFactor
      );
    }
    
    geo.computeVertexNormals();
    return geo;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const offset = index * 0.7;
      
      // Flowing teardrop motion
      meshRef.current.position.x = Math.cos(time * 0.6 + offset) * (2.5 + Math.sin(time * 0.4) * 0.8);
      meshRef.current.position.z = Math.sin(time * 0.6 + offset) * (2.5 + Math.sin(time * 0.4) * 0.8);
      meshRef.current.position.y = Math.sin(time * 1.2 + offset) * 1.2;
      
      // Organic rotation and scaling
      meshRef.current.rotation.x = time * 0.3 + offset;
      meshRef.current.rotation.z = Math.sin(time * 0.8 + offset) * 0.3;
      meshRef.current.scale.setScalar(scale + Math.sin(time * 2.5 + offset) * 0.15);
    }
  });

  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <primitive object={material} attach="material" />
    </mesh>
  );
}

interface TeardropsProps {
  material: THREE.Material;
  numBalls: number;
}

export default function Teardrops({ material, numBalls }: TeardropsProps) {
  const groupRef = useRef<THREE.Group>(null);

  const teardrops = useMemo(() => {
    const drops = [];
    const radius = 2.2;
    
    for (let i = 0; i < numBalls; i++) {
      const angle = (i / numBalls) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 2.5;
      
      drops.push({
        position: [x, y, z] as [number, number, number],
        scale: 0.7 + Math.random() * 0.5,
        id: i
      });
    }
    
    return drops;
  }, [numBalls]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {teardrops.map((drop) => (
        <Teardrop
          key={drop.id}
          position={drop.position}
          scale={drop.scale}
          material={material}
          index={drop.id}
        />
      ))}
    </group>
  );
}