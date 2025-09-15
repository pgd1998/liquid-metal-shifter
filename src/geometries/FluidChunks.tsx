import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FluidChunkProps {
  position: [number, number, number];
  scale: number;
  material: THREE.Material;
  index: number;
}

// Simple noise function
function noise3D(x: number, y: number, z: number): number {
  return (
    Math.sin(x * 3.14159) * Math.cos(y * 2.71828) * Math.sin(z * 1.41421) +
    Math.sin(x * 2.5) * Math.cos(y * 3.1) * Math.sin(z * 2.2) * 0.5 +
    Math.sin(x * 4.7) * Math.cos(y * 1.9) * Math.sin(z * 3.3) * 0.25
  ) / 1.75;
}

function FluidChunk({ position, scale, material, index }: FluidChunkProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 24, 24);
    const positionAttribute = geo.getAttribute('position');
    
    // Apply noise deformation for irregular fluid chunks
    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);
      const z = positionAttribute.getZ(i);
      
      // Calculate noise for this vertex
      const noiseScale = 2.0;
      const noiseAmount = 0.4;
      const n1 = noise3D(x * noiseScale + index, y * noiseScale, z * noiseScale);
      const n2 = noise3D(x * noiseScale * 2 + index * 0.5, y * noiseScale * 2, z * noiseScale * 2) * 0.5;
      
      const totalNoise = (n1 + n2) * noiseAmount;
      const length = Math.sqrt(x * x + y * y + z * z);
      const deformedLength = length + totalNoise;
      
      const factor = deformedLength / length;
      
      positionAttribute.setXYZ(
        i,
        x * factor,
        y * factor,
        z * factor
      );
    }
    
    geo.computeVertexNormals();
    return geo;
  }, [index]);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const offset = index * 0.8;
      
      // Irregular, chunky movement pattern
      const chunkSpeed = 0.4;
      meshRef.current.position.x = Math.cos(time * chunkSpeed + offset) * (3 + Math.sin(time * 0.2) * 1.2);
      meshRef.current.position.z = Math.sin(time * chunkSpeed + offset) * (3 + Math.sin(time * 0.2) * 1.2);
      meshRef.current.position.y = Math.sin(time * 0.9 + offset) * 1.5 + Math.cos(time * 1.7 + offset) * 0.5;
      
      // Irregular rotation
      meshRef.current.rotation.x = time * 0.4 + offset + Math.sin(time * 1.3) * 0.2;
      meshRef.current.rotation.y = time * 0.6 + offset * 0.7;
      meshRef.current.rotation.z = Math.sin(time * 0.7 + offset) * 0.4;
      
      // Pulsing scale with irregularity
      meshRef.current.scale.setScalar(
        scale + 
        Math.sin(time * 2.2 + offset) * 0.2 + 
        Math.cos(time * 3.1 + offset * 0.6) * 0.1
      );
    }
  });

  return (
    <mesh ref={meshRef} position={position} geometry={geometry}>
      <primitive object={material} attach="material" />
    </mesh>
  );
}

interface FluidChunksProps {
  material: THREE.Material;
  numBalls: number;
}

export default function FluidChunks({ material, numBalls }: FluidChunksProps) {
  const groupRef = useRef<THREE.Group>(null);

  const chunks = useMemo(() => {
    const chunkArray = [];
    const radius = 2.8;
    
    for (let i = 0; i < numBalls; i++) {
      const angle = (i / numBalls) * Math.PI * 2;
      const x = Math.cos(angle) * radius + (Math.random() - 0.5) * 0.8;
      const z = Math.sin(angle) * radius + (Math.random() - 0.5) * 0.8;
      const y = (Math.random() - 0.5) * 3;
      
      chunkArray.push({
        position: [x, y, z] as [number, number, number],
        scale: 0.6 + Math.random() * 0.6,
        id: i
      });
    }
    
    return chunkArray;
  }, [numBalls]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {chunks.map((chunk) => (
        <FluidChunk
          key={chunk.id}
          position={chunk.position}
          scale={chunk.scale}
          material={material}
          index={chunk.id}
        />
      ))}
    </group>
  );
}