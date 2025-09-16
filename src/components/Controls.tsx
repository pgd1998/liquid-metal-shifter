import { Leva } from 'leva';

export default function Controls() {
  return (
    <>
      <Leva
        collapsed={false}
        oneLineLabels={true}
        titleBar={{ title: 'Liquid Metal Controls' }}
        theme={{
          colors: {
            elevation1: '#1a1a1a',
            elevation2: '#2a2a2a',
            elevation3: '#3a3a3a',
            accent1: '#4FC3F7',
            accent2: '#FF6B6B',
            accent3: '#FFE082',
            highlight1: '#ffffff',
            highlight2: '#cccccc',
            highlight3: '#999999',
            vivid1: '#4FC3F7',
            folderWidgetColor: '$accent1',
            folderTextColor: '$highlight3',
            toolTipBackground: '$elevation2',
            toolTipText: '$highlight2'
          },
          fontSizes: {
            root: '11px'
          },
          space: {
            xs: '3px',
            sm: '6px',
            md: '10px',
            rowGap: '7px',
            colGap: '7px'
          },
          fonts: {
            mono: 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace'
          }
        }}
      />
      
      <div style={{
        position: 'fixed',
        top: '10px',
        left: '10px',
        color: '#ffffff',
        fontSize: '12px',
        fontFamily: 'monospace',
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '8px 12px',
        borderRadius: '4px',
        backdropFilter: 'blur(4px)',
        zIndex: 1000
      }}>
        <div>🧠 Neural Intelligence: Active</div>
        <div>🌊 Fluid Simulation: Running</div>
        <div>⚡ Real-time Learning: Enabled</div>
      </div>
    </>
  );
}