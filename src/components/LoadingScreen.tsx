import { Html } from '@react-three/drei';

export default function LoadingScreen() {
  return (
    <Html center>
      <div style={{
        color: '#ffffff',
        fontSize: '14px',
        fontWeight: 300,
        letterSpacing: '0.1em',
        textAlign: 'center',
        animation: 'pulse 2s infinite'
      }}>
        <div>Initializing Liquid Metal</div>
        <div style={{ fontSize: '12px', opacity: 0.7, marginTop: '8px' }}>
          Neural networks calibrating...
        </div>
      </div>
    </Html>
  );
}