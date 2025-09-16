import { useGeometryStore, geometryTypes, GeometryType } from '../store/geometryStore';

export default function GeometrySelector() {
  const { currentGeometry, setGeometry } = useGeometryStore();

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '12px',
      background: 'rgba(10, 10, 10, 0.9)',
      padding: '16px 24px',
      borderRadius: '50px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
      zIndex: 1000,
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      {geometryTypes.map((type) => (
        <button
          key={type.id}
          onClick={() => setGeometry(type.id as GeometryType)}
          style={{
            background: currentGeometry === type.id 
              ? 'linear-gradient(135deg, #4FC3F7 0%, #29B6F6 100%)'
              : 'rgba(255, 255, 255, 0.05)',
            border: currentGeometry === type.id 
              ? '1px solid #4FC3F7'
              : '1px solid rgba(255, 255, 255, 0.1)',
            color: currentGeometry === type.id ? '#000000' : '#ffffff',
            padding: '10px 18px',
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: currentGeometry === type.id ? '600' : '400',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            outline: 'none',
            position: 'relative',
            overflow: 'hidden',
            minWidth: '120px',
            textAlign: 'center' as const
          }}
          onMouseEnter={(e) => {
            if (currentGeometry !== type.id) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseLeave={(e) => {
            if (currentGeometry !== type.id) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          <div style={{ fontWeight: '600', marginBottom: '2px' }}>
            {type.name}
          </div>
          <div style={{ 
            fontSize: '11px', 
            opacity: currentGeometry === type.id ? 0.8 : 0.6,
            lineHeight: '1.2'
          }}>
            {type.description}
          </div>
        </button>
      ))}
    </div>
  );
}