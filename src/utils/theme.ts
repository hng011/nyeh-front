import * as THREE from 'three';

export interface ThemeConfig {
  /** CSS color for renderer clear color */
  clearColor: string;
  /** Fog color */
  fogColor: string;
  fogNear: number;
  fogFar: number;
  /** Ambient light */
  ambientColor: string;
  ambientIntensity: number;
  /** Directional light (sun/moon) */
  directionalColor: string;
  directionalIntensity: number;
  directionalPosition: [number, number, number];
  /** Tree trunk */
  trunkColor: string;
  /** Tree foliage HSL base: [hue, saturation, lightness] */
  foliageHSL: [number, number, number];
  /** Snow material */
  snowOpacity: number;
  snowSize: number;
  /** Snow radial gradient inner color */
  snowInnerColor: string;
  /** Ground color */
  groundColor: string;
}

export const DARK_THEME: ThemeConfig = {
  clearColor: '#0f172a',
  fogColor: '#1e293b',
  fogNear: 4,
  fogFar: 18,
  ambientColor: '#334466',
  ambientIntensity: 0.6,
  directionalColor: '#aaccff',
  directionalIntensity: 0.5,
  directionalPosition: [3, 8, 2],
  trunkColor: '#5c3a1e',
  foliageHSL: [0.28, 0.5, 0.25],
  snowOpacity: 0.85,
  snowSize: 0.18,
  snowInnerColor: 'rgba(255,255,255,1)',
  groundColor: '#e2e8f0',
};

export const LIGHT_THEME: ThemeConfig = {
  clearColor: '#b8d4e3',
  fogColor: '#c8dce8',
  fogNear: 6,
  fogFar: 22,
  ambientColor: '#8899aa',
  ambientIntensity: 0.8,
  directionalColor: '#ffeedd',
  directionalIntensity: 0.6,
  directionalPosition: [5, 10, 4],
  trunkColor: '#6b4226',
  foliageHSL: [0.32, 0.55, 0.28],
  snowOpacity: 0.75,
  snowSize: 0.18,
  snowInnerColor: 'rgba(255,255,255,1)',
  groundColor: '#f1f5f9',
};

/** Convert CSS hex color string to THREE.Color */
export function hexToColor(hex: string): THREE.Color {
  return new THREE.Color(hex);
}

/** Linearly interpolate between two THREE.Colors */
export function lerpColor(a: THREE.Color, b: THREE.Color, t: number): THREE.Color {
  return a.clone().lerp(b, t);
}

/** Linearly interpolate between two numbers */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
