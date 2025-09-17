import { useState, useEffect } from 'react';

export default function UserGuide() {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Auto-hide after 8 seconds
    const timer = setTimeout(() => {
      handleClose();
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 300);
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`user-guide ${isClosing ? 'closing' : ''}`}
      onClick={handleClose}
      style={{
        position: 'fixed',
        bottom: '20px',
        left: '20px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: '#ffffff',
        padding: '16px 20px',
        borderRadius: '12px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        fontSize: '14px',
        lineHeight: '1.4',
        maxWidth: '280px',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        cursor: 'pointer',
        zIndex: 1000,
        opacity: isClosing ? 0 : 1,
        transform: isClosing ? 'translateY(-10px)' : 'translateY(0)',
        transition: 'all 0.3s ease-out',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
      }}
    >
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'flex-start',
        marginBottom: '8px'
      }}>
        <h3 style={{ 
          margin: 0, 
          fontSize: '16px', 
          fontWeight: '600',
          color: '#C0C0C0'
        }}>
          Interactive Liquid Metal
        </h3>
        <span style={{ 
          fontSize: '18px', 
          opacity: 0.6,
          marginLeft: '8px'
        }}>
          ×
        </span>
      </div>
      
      <div style={{ fontSize: '13px', opacity: 0.9 }}>
        <div style={{ marginBottom: '6px' }}>
          🖱️ <strong>Drag to rotate</strong> • Scroll to zoom
        </div>
        <div style={{ marginBottom: '6px' }}>
          🎛️ <strong>Use the panel</strong> to adjust materials
        </div>
        <div>
          🔄 <strong>Switch geometry types</strong> for variety
        </div>
      </div>
      
      <div style={{ 
        fontSize: '11px', 
        opacity: 0.6, 
        marginTop: '10px',
        textAlign: 'center'
      }}>
        Click to dismiss • Auto-hides in 8s
      </div>
    </div>
  );
}