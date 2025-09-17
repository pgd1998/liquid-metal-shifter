import React, { useRef, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import * as THREE from 'three';
import { useGeometryStore } from '../store/geometryStore';
import Metaballs from '../geometries/Metaballs';
import Teardrops from '../geometries/Teardrops';
import FluidChunks from '../geometries/FluidChunks';

export default function LiquidMetal() {
  const { mouse } = useThree();
  const [mousePosition] = useState(new THREE.Vector3());
  const { currentGeometry } = useGeometryStore();

  const { 
    viscosity,
    metallic,
    roughness,
    baseColor,
    emissive,
    numBalls,
    mouseInfluence
  } = useControls('Liquid Metal', {
    viscosity: { value: 0.5, min: 0, max: 1, step: 0.01 },
    metallic: { value: 0.9, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0.1, min: 0, max: 1, step: 0.01 },
    baseColor: '#C0C0C0',
    emissive: '#001122',
    numBalls: { value: 8, min: 3, max: 15, step: 1 },
    mouseInfluence: { value: 0.3, min: 0, max: 1, step: 0.01 }
  });

  const materialRef = useRef<THREE.MeshStandardMaterial>();

  const material = useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: baseColor,
      metalness: metallic,
      roughness: roughness,
      emissive: emissive,
      emissiveIntensity: 0.1,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide
    });
    
    materialRef.current = mat;
    return mat;
  }, []);

  // Update material properties when controls change
  React.useEffect(() => {
    if (materialRef.current) {
      materialRef.current.color.set(baseColor);
      materialRef.current.metalness = metallic;
      materialRef.current.roughness = roughness;
      materialRef.current.emissive.set(emissive);
      materialRef.current.needsUpdate = true;
    }
  }, [viscosity, metallic, roughness, baseColor, emissive, mouseInfluence]);


  useFrame(() => {
    // Update mouse position
    mousePosition.set(mouse.x * 5, mouse.y * 5, 0);
  });

  const renderGeometry = () => {
    switch (currentGeometry) {
      case 'metaballs':
        return <Metaballs material={material} numBalls={numBalls} />;
      case 'teardrops':
        return <Teardrops material={material} numBalls={numBalls} />;
      case 'fluidChunks':
        return <FluidChunks material={material} numBalls={numBalls} />;
      default:
        return <Metaballs material={material} numBalls={numBalls} />;
    }
  };

  return renderGeometry();
}