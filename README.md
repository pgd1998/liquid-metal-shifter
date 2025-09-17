# Liquid Metal Shifter

> **Interactive 3D Liquid Metal Simulation** - A design engineering portfolio piece showcasing advanced web graphics, real-time interactions, and optimized performance.

**Tech Stack:** React Three Fiber • TypeScript • Three.js • WebGL • Vite

## 🚀 Live Demo

**[View Live Demo →](https://liquid-metal-shifter.vercel.app/)**

Experience the interactive liquid metal simulation with real-time material controls and multiple geometry types.

## 🎯 Design Engineering Showcase

This project demonstrates key design engineering competencies:

### **Interactive 3D Graphics**
- Real-time WebGL rendering using React Three Fiber
- Multiple procedural geometry types (Metaballs, Teardrops, Fluid Chunks)
- Dynamic material property manipulation
- Smooth 60fps animations with optimized render loops

### **Performance Optimization**
- **Bundle Splitting**: Optimized webpack chunks for faster loading
- **Material Sharing**: Single material instance shared across all objects
- **Memoization**: Strategic use of `useMemo` and `useEffect` for efficient updates
- **Efficient Geometry**: Optimized vertex counts and LOD considerations
- **GPU Acceleration**: Leveraging Three.js GPU-optimized shaders

### **User Experience Design**
- **Intuitive Controls**: Real-time parameter adjustment with Leva
- **Responsive Interface**: Adaptive UI that works across devices
- **Progressive Disclosure**: Contextual user guide with auto-hide
- **Visual Feedback**: Immediate response to user interactions

## 🛠️ Technical Architecture

### **Core Technologies**
```typescript
React 18.2.0          // Component architecture & state management
React Three Fiber     // Declarative 3D rendering
Three.js 0.160.0      // WebGL graphics engine
TypeScript 5.3.3      // Type-safe development
Vite 5.0.10           // Fast build tooling
Leva 0.9.35           // Real-time parameter controls
Zustand 4.4.7         // Lightweight state management
```

### **3D Implementation Details**

#### **Geometry Generation**
- **Metaballs**: Spherical geometry with organic motion patterns
- **Teardrops**: Procedurally deformed spheres with teardrop profiles
- **Fluid Chunks**: Noise-based deformation for irregular fluid shapes

#### **Material System**
```typescript
const material = useMemo(() => {
  return new THREE.MeshStandardMaterial({
    metalness: metallic,
    roughness: roughness,
    color: baseColor,
    emissive: emissive,
    transparent: true,
    opacity: 0.9,
    side: THREE.DoubleSide
  });
}, []);
```

#### **Animation Engine**
- **useFrame**: 60fps render loop integration
- **Physics-based motion**: Trigonometric functions for organic movement
- **Synchronized timing**: Consistent animation across all objects

### **State Management Strategy**

#### **Component State**
```typescript
// Material properties managed centrally
const { metallic, roughness, baseColor, emissive, numBalls } = useControls({
  metallic: { value: 0.9, min: 0, max: 1, step: 0.01 },
  roughness: { value: 0.1, min: 0, max: 1, step: 0.01 },
  // ... optimized for real-time updates
});
```

#### **Geometry Switching**
```typescript
// Type-safe geometry management
export type GeometryType = 'metaballs' | 'teardrops' | 'fluidChunks';
const { currentGeometry } = useGeometryStore();
```

## 🎨 Design System

### **Visual Design Principles**
- **Material Realism**: PBR (Physically Based Rendering) materials
- **Organic Motion**: Fluid-like animations that feel natural
- **Interactive Feedback**: Immediate visual response to parameter changes
- **Minimalist UI**: Clean interface that doesn't compete with 3D content

### **Color Palette**
```css
Primary:   #C0C0C0  /* Liquid metal base */
Accent:    #001122  /* Emissive highlights */
UI Dark:   #0a0a0a  /* Background gradient start */
UI Light:  #1a1a1a  /* Background gradient end */
```

## ⚡ Performance Optimizations

### **Rendering Optimizations**
- **Single Material Instance**: All objects share one material for efficient GPU usage
- **Optimized Geometry**: Balanced vertex counts (32x32 for spheres, 24x24 for chunks)
- **Frustum Culling**: Automatic by Three.js for off-screen objects
- **Batch Rendering**: Grouped objects for reduced draw calls

### **Memory Management**
- **Geometry Reuse**: Same base geometries across instances
- **Efficient Updates**: Only update material properties, not recreate objects
- **Cleanup**: Proper disposal of Three.js objects on unmount

### **Bundle Optimization**
```javascript
// Vite build output (optimized):
dist/index.html                   1.86 kB
dist/assets/index-[hash].js      183.73 kB  // Main app bundle
dist/assets/react-three-[hash].js 382.91 kB  // 3D library chunk
dist/assets/three-[hash].js      666.85 kB  // Three.js chunk
```

## 🧩 Component Architecture

### **Modular Design**
```
src/
├── components/           # React components
│   ├── LiquidMetal.tsx  # Main 3D scene controller
│   ├── UserGuide.tsx    # Interactive help overlay
│   └── Controls.tsx     # Parameter interface
├── geometries/          # 3D geometry definitions
│   ├── Metaballs.tsx    # Spherical liquid metal
│   ├── Teardrops.tsx    # Organic teardrop shapes
│   └── FluidChunks.tsx  # Irregular noise-based forms
└── store/               # State management
    └── geometryStore.ts # Geometry type switching
```

### **Separation of Concerns**
- **Presentation**: React components handle UI and user interactions
- **3D Logic**: Separate geometry components manage Three.js specifics
- **State**: Zustand provides predictable state management
- **Controls**: Leva handles real-time parameter manipulation

## 🚦 Development Workflow

### **Local Development**
```bash
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Production build
npm run preview     # Preview production build
```

### **Type Safety**
Full TypeScript implementation with:
- Strict type checking for Three.js objects
- Interface definitions for all component props
- Type-safe state management with Zustand

### **Performance Monitoring**
- Built-in FPS monitoring (development)
- Bundle size analysis
- Memory usage optimization

## 🎯 Design Engineering Highlights

### **Problem-Solving Approach**
1. **Performance First**: Optimized render loops and memory usage
2. **User-Centric**: Intuitive controls with immediate visual feedback
3. **Scalable Architecture**: Modular components for easy extension
4. **Cross-Platform**: Responsive design that works on desktop and mobile

### **Technical Innovation**
- **Material Sharing Solution**: Solved multi-object material updates efficiently
- **Procedural Geometry**: Three different algorithmic approaches to liquid forms
- **Real-time Controls**: Seamless parameter adjustment without performance loss
- **Optimized Build**: Strategic code splitting for faster loading

### **Design Decisions**
- **React Three Fiber** over vanilla Three.js for declarative 3D
- **Zustand** over Redux for lightweight state management
- **Vite** over Webpack for faster development iteration
- **TypeScript** for maintainable, production-ready code

## 📊 Performance Metrics

- **Frame Rate**: Consistent 60fps on modern hardware
- **Bundle Size**: Optimized chunks with lazy loading
- **Memory Usage**: Efficient geometry and material sharing
- **Load Time**: Fast initial page load with progressive enhancement

---

**Built for Design Engineering Excellence** - This project showcases the intersection of technical performance, user experience design, and interactive 3D graphics that defines modern design engineering.