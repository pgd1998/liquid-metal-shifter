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
      
      
    </>
  );
}