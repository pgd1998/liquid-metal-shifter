import { Environment, ContactShadows } from '@react-three/drei';
import LiquidMetal from './LiquidMetal';
import Lighting from './Lighting';

export default function Scene() {
  return (
    <>
      <Lighting />
      
      <Environment preset="studio" />
      
      <LiquidMetal />
      
      <ContactShadows
        position={[0, -2, 0]}
        opacity={0.4}
        scale={10}
        blur={1}
        far={4}
        resolution={256}
        color="#000000"
      />
      
      <fog attach="fog" args={['#0a0a0a', 8, 25]} />
    </>
  );
}