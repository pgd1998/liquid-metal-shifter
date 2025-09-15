import { create } from 'zustand';

export type GeometryType = 'metaballs' | 'teardrops' | 'fluidChunks' | 'morphingPoly';

interface GeometryState {
  currentGeometry: GeometryType;
  setGeometry: (geometry: GeometryType) => void;
}

export const useGeometryStore = create<GeometryState>((set) => ({
  currentGeometry: 'metaballs',
  setGeometry: (geometry) => set({ currentGeometry: geometry }),
}));

export const geometryTypes = [
  { id: 'metaballs', name: 'Metaballs', description: 'Classic spherical liquid metal' },
  { id: 'teardrops', name: 'Teardrops', description: 'Organic flowing blob shapes' },
  { id: 'fluidChunks', name: 'Fluid Chunks', description: 'Irregular noise-deformed geometry' },
  { id: 'morphingPoly', name: 'Morphing Poly', description: 'Shape-shifting geometric forms' },
] as const;