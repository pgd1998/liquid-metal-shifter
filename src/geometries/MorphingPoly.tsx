import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface MorphingPolyComponentProps {
  position: [number, number, number];
  scale: number;
  material: THREE.Material;
  index: number;
}

function MorphingPoly({ position, scale, material, index }: MorphingPolyComponentProps) {
  const meshRef = useRef<THREE.Mesh>(null);


  const morphGeometry = useMemo(() => {
    const geo = new THREE.SphereGeometry(1, 16, 16);
    
    // Initialize morph attributes
    if (!geo.morphAttributes.position) {
      geo.morphAttributes.position = [];
    }
    
    // Create morph targets with same vertex count as sphere
    const sphereCount = geo.attributes.position.count;
    const morphTarget1 = new Float32Array(sphereCount * 3);
    const morphTarget2 = new Float32Array(sphereCount * 3);
    
    // Get sphere positions
    const spherePositions = geo.attributes.position.array as Float32Array;
    
    // Map sphere vertices to cube-like and octahedron-like positions
    for (let i = 0; i < sphereCount; i++) {
      const i3 = i * 3;
      const x = spherePositions[i3];
      const y = spherePositions[i3 + 1];
      const z = spherePositions[i3 + 2];
      
      // Cube-like deformation (safe division)
      const maxCoord = Math.max(Math.abs(x), Math.abs(y), Math.abs(z));
      if (maxCoord > 0) {
        morphTarget1[i3] = (x / maxCoord) * Math.sign(x) * 1.2;
        morphTarget1[i3 + 1] = (y / maxCoord) * Math.sign(y) * 1.2;
        morphTarget1[i3 + 2] = (z / maxCoord) * Math.sign(z) * 1.2;
      } else {
        morphTarget1[i3] = x;
        morphTarget1[i3 + 1] = y;
        morphTarget1[i3 + 2] = z;
      }
      
      // Octahedron-like deformation (safe division)
      const sum = Math.abs(x) + Math.abs(y) + Math.abs(z);
      if (sum > 0) {
        morphTarget2[i3] = (x / sum) * Math.sign(x) * 1.4;
        morphTarget2[i3 + 1] = (y / sum) * Math.sign(y) * 1.4;
        morphTarget2[i3 + 2] = (z / sum) * Math.sign(z) * 1.4;
      } else {
        morphTarget2[i3] = x;
        morphTarget2[i3 + 1] = y;
        morphTarget2[i3 + 2] = z;
      }
    }
    
    // Add morph targets
    geo.morphAttributes.position[0] = new THREE.BufferAttribute(morphTarget1, 3);
    geo.morphAttributes.position[1] = new THREE.BufferAttribute(morphTarget2, 3);
    
    return geo;
  }, []);

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      const offset = index * 1.2;
      
      // Smooth orbital movement
      meshRef.current.position.x = Math.cos(time * 0.5 + offset) * (2.5 + Math.sin(time * 0.3) * 0.7);
      meshRef.current.position.z = Math.sin(time * 0.5 + offset) * (2.5 + Math.sin(time * 0.3) * 0.7);
      meshRef.current.position.y = Math.sin(time * 0.8 + offset) * 1.0;
      
      // Morphing between shapes
      const morphCycle = time * 0.8 + offset;
      const morph1 = (Math.sin(morphCycle) + 1) / 2; // 0 to 1
      const morph2 = (Math.sin(morphCycle + Math.PI / 3) + 1) / 2; // 0 to 1
      
      if (meshRef.current.morphTargetInfluences) {
        meshRef.current.morphTargetInfluences[0] = morph1;
        meshRef.current.morphTargetInfluences[1] = morph2;
      }
      
      // Rotation during morphing
      meshRef.current.rotation.x = time * 0.7 + offset;
      meshRef.current.rotation.y = time * 0.5 + offset * 0.8;
      meshRef.current.rotation.z = Math.sin(time * 0.9 + offset) * 0.5;
      
      // Scale variation
      meshRef.current.scale.setScalar(scale + Math.sin(time * 1.8 + offset) * 0.18);
    }
  });

  return (
    <mesh 
      ref={meshRef} 
      position={position} 
      geometry={morphGeometry}
      morphTargetInfluences={[0, 0]}
    >
      <primitive object={material} attach="material" />
    </mesh>
  );
}

interface MorphingPolyProps {
  material: THREE.Material;
  numBalls: number;
}

export default function MorphingPolyhedrons({ material, numBalls }: MorphingPolyProps) {
  const groupRef = useRef<THREE.Group>(null);

  const polyhedrons = useMemo(() => {
    const polys = [];
    const radius = 2.3;
    
    for (let i = 0; i < numBalls; i++) {
      const angle = (i / numBalls) * Math.PI * 2;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius;
      const y = (Math.random() - 0.5) * 2.2;
      
      polys.push({
        position: [x, y, z] as [number, number, number],
        scale: 0.7 + Math.random() * 0.4,
        id: i
      });
    }
    
    return polys;
  }, [numBalls]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.18;
    }
  });

  return (
    <group ref={groupRef}>
      {polyhedrons.map((poly) => (
        <MorphingPoly
          key={poly.id}
          position={poly.position}
          scale={poly.scale}
          material={material}
          index={poly.id}
        />
      ))}
    </group>
  );
}