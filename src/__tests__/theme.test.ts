import { describe, it, expect } from 'vitest';
import { DARK_THEME, LIGHT_THEME, hexToColor, lerpColor, lerp } from '../utils/theme';
import * as THREE from 'three';

describe('Theme configs', () => {
  it('DARK_THEME has all required keys', () => {
    const keys = [
      'clearColor', 'fogColor', 'fogNear', 'fogFar',
      'ambientColor', 'ambientIntensity',
      'directionalColor', 'directionalIntensity', 'directionalPosition',
      'trunkColor', 'foliageHSL', 'snowOpacity', 'snowSize',
      'snowInnerColor', 'groundColor',
    ];
    for (const key of keys) {
      expect(DARK_THEME).toHaveProperty(key);
    }
  });

  it('LIGHT_THEME has all required keys', () => {
    const keys = [
      'clearColor', 'fogColor', 'fogNear', 'fogFar',
      'ambientColor', 'ambientIntensity',
      'directionalColor', 'directionalIntensity', 'directionalPosition',
      'trunkColor', 'foliageHSL', 'snowOpacity', 'snowSize',
      'snowInnerColor', 'groundColor',
    ];
    for (const key of keys) {
      expect(LIGHT_THEME).toHaveProperty(key);
    }
  });

  it('light theme has brighter clear color than dark theme', () => {
    const dark = hexToColor(DARK_THEME.clearColor);
    const light = hexToColor(LIGHT_THEME.clearColor);
    // Light theme should be brighter
    expect(light.getHSL({} as any).l).toBeGreaterThan(dark.getHSL({} as any).l);
  });

  it('light theme has higher ambient intensity', () => {
    expect(LIGHT_THEME.ambientIntensity).toBeGreaterThan(DARK_THEME.ambientIntensity);
  });

  it('foliageHSL is a tuple of 3 numbers', () => {
    expect(DARK_THEME.foliageHSL).toHaveLength(3);
    expect(LIGHT_THEME.foliageHSL).toHaveLength(3);
    for (const v of DARK_THEME.foliageHSL) expect(typeof v).toBe('number');
    for (const v of LIGHT_THEME.foliageHSL) expect(typeof v).toBe('number');
  });
});

describe('hexToColor', () => {
  it('converts hex string to THREE.Color', () => {
    const c = hexToColor('#ff0000');
    expect(c).toBeInstanceOf(THREE.Color);
    expect(c.r).toBeCloseTo(1);
    expect(c.g).toBeCloseTo(0);
    expect(c.b).toBeCloseTo(0);
  });

  it('handles lowercase hex string', () => {
    const c = hexToColor('#00ff00');
    expect(c).toBeInstanceOf(THREE.Color);
    expect(c.r).toBeCloseTo(0);
    expect(c.g).toBeCloseTo(1);
    expect(c.b).toBeCloseTo(0);
  });
});

describe('lerp', () => {
  it('returns start when t=0', () => {
    expect(lerp(10, 20, 0)).toBe(10);
  });

  it('returns end when t=1', () => {
    expect(lerp(10, 20, 1)).toBe(20);
  });

  it('returns midpoint when t=0.5', () => {
    expect(lerp(10, 20, 0.5)).toBe(15);
  });
});

describe('lerpColor', () => {
  it('returns start color when t=0', () => {
    const a = new THREE.Color('#000000');
    const b = new THREE.Color('#ffffff');
    const c = lerpColor(a, b, 0);
    expect(c.r).toBeCloseTo(0);
    expect(c.g).toBeCloseTo(0);
    expect(c.b).toBeCloseTo(0);
  });

  it('returns end color when t=1', () => {
    const a = new THREE.Color('#000000');
    const b = new THREE.Color('#ffffff');
    const c = lerpColor(a, b, 1);
    expect(c.r).toBeCloseTo(1);
    expect(c.g).toBeCloseTo(1);
    expect(c.b).toBeCloseTo(1);
  });

  it('does not mutate inputs', () => {
    const a = new THREE.Color('#000000');
    const b = new THREE.Color('#ffffff');
    const aOrig = a.clone();
    const bOrig = b.clone();
    lerpColor(a, b, 0.5);
    expect(a.r).toBe(aOrig.r);
    expect(b.r).toBe(bOrig.r);
  });
});
