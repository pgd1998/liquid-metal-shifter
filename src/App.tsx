import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Scene from '@components/Scene';
import LoadingScreen from '@components/LoadingScreen';
import Controls from '@components/Controls';
import GeometrySelector from '@components/GeometrySelector';

export default function App() {
  return (
    <>
      <Canvas
        camera={{
          position: [0, 0, 8],
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance"
        }}
        style={{
          background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)'
        }}
      >
        <Suspense fallback={<LoadingScreen />}>
          <Scene />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={2}
            maxDistance={20}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
          />
        </Suspense>
      </Canvas>
      <Controls />
      <GeometrySelector />
    </>
  );
}