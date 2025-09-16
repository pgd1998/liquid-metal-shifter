
export default function Lighting() {
  return (
    <>
      <ambientLight intensity={0.2} color="#ffffff" />
      
      <directionalLight
        position={[5, 5, 5]}
        intensity={1.5}
        color="#ffffff"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.1}
        shadow-camera-far={20}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />
      
      <pointLight position={[-5, 3, 0]} intensity={0.8} color="#4FC3F7" />
      <pointLight position={[5, -3, 0]} intensity={0.6} color="#FF6B6B" />
      
      <spotLight
        position={[0, 8, 0]}
        angle={0.3}
        penumbra={0.5}
        intensity={1}
        color="#ffffff"
        castShadow
      />
    </>
  );
}