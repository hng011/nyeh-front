import * as THREE from 'three';
import type { ThemeConfig } from './theme';
import { DARK_THEME, LIGHT_THEME, hexToColor, lerp } from './theme';

const PARTICLE_COUNT_DESKTOP = 1000;
const PARTICLE_COUNT_MOBILE = 500;
const SNOW_AREA_WIDTH = 18;
const SNOW_AREA_DEPTH = 8;
const SNOW_TOP = 7;
const SNOW_BOTTOM = -6;
const CURSOR_RADIUS = 2.5;
const CURSOR_FORCE_BASE = 3.5;
const CURSOR_FORCE_SPEED = 1.5;
const CAMERA_PARALLAX = 0.15;

interface SnowParticle {
  velocity: number;
  driftAmp: number;
  driftPhase: number;
  swayAmp: number;
  swayPhase: number;
  repelX: number;
  repelY: number;
}

interface TreeDef {
  x: number;
  z: number;
}

const TREE_DEFS: TreeDef[] = [
  { x: -5.5, z: 0 }, { x: -3.8, z: 1.8 }, { x: -2.0, z: -1.2 },
  { x: -0.2, z: 2.0 }, { x: 1.8, z: -1.5 }, { x: 3.6, z: 0.8 },
  { x: 5.5, z: -0.5 },
];

function isMobileDevice(): boolean {
  return window.innerWidth < 768;
}

export class WinterScene {
  private canvas: HTMLCanvasElement;
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private ambient!: THREE.AmbientLight;
  private directional!: THREE.DirectionalLight;
  private fog!: THREE.Fog;
  private trees: THREE.Group[] = [];
  private trunkMaterials: THREE.MeshPhongMaterial[] = [];
  private foliageMaterials: THREE.MeshPhongMaterial[] = [];
  private ground!: THREE.Mesh;
  private groundMat!: THREE.MeshPhongMaterial;
  private snowPoints!: THREE.Points;
  private snowMat!: THREE.PointsMaterial;
  private snowGeo!: THREE.BufferGeometry;
  private particles: SnowParticle[] = [];
  private snowCount!: number;

  private targetTheme: ThemeConfig;
  private currentClear = new THREE.Color();
  private currentFog = new THREE.Color();
  private currentAmbient = new THREE.Color();
  private currentDirectional = new THREE.Color();
  private currentTrunk = new THREE.Color();
  private currentFoliage = new THREE.Color();
  private currentGround = new THREE.Color();

  private animationId = 0;
  private lastTime = 0;
  private elapsedTime = 0;
  private disposed = false;
  private reduceMotion = false;

  private pointerX = 0;
  private pointerY = 0;
  private targetPointerX = 0;
  private targetPointerY = 0;
  private cursorSpeed = 0;
  private lastCursorX = 0;
  private lastCursorY = 0;
  private isVisible = true;
  private isInViewport = true;

  private resizeObserver: ResizeObserver | null = null;
  private aborted = false;

  constructor(canvas: HTMLCanvasElement, isDark: boolean) {
    this.canvas = canvas;
    this.targetTheme = isDark ? DARK_THEME : LIGHT_THEME;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.reduceMotion = media.matches;
    media.addEventListener('change', this.onReducedMotionChange);

    if (!this.initWebGL()) return;

    this.setupScene();
    this.createLights(this.targetTheme);
    this.createTrees(this.targetTheme);
    this.createGround(this.targetTheme);
    this.createSnow(this.targetTheme);
    this.setupEventListeners();
    this.handleResize();
    this.animate();
  }

  private initWebGL(): boolean {
    const ctx = this.canvas.getContext('webgl2') || this.canvas.getContext('webgl');
    if (!ctx) { this.aborted = true; return false; }

    this.renderer = new THREE.WebGLRenderer({ canvas: this.canvas, alpha: false, antialias: true });
    this.renderer.setClearColor(hexToColor(this.targetTheme.clearColor));
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    return true;
  }

  private setupScene(): void {
    this.scene = new THREE.Scene();
    this.fog = new THREE.Fog(
      hexToColor(this.targetTheme.fogColor),
      this.targetTheme.fogNear,
      this.targetTheme.fogFar,
    );
    this.scene.fog = this.fog;

    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 40);
    this.camera.position.set(0, 1.5, 9);
    this.camera.lookAt(0, 0.5, 0);

    this.currentClear.copy(hexToColor(this.targetTheme.clearColor));
    this.currentFog.copy(hexToColor(this.targetTheme.fogColor));
  }

  private createLights(theme: ThemeConfig): void {
    this.currentAmbient.copy(hexToColor(theme.ambientColor));
    this.ambient = new THREE.AmbientLight(this.currentAmbient, theme.ambientIntensity);
    this.scene.add(this.ambient);

    this.currentDirectional.copy(hexToColor(theme.directionalColor));
    this.directional = new THREE.DirectionalLight(this.currentDirectional, theme.directionalIntensity);
    this.directional.position.set(...theme.directionalPosition);
    this.scene.add(this.directional);
  }

  private createTree(variant: number, theme: ThemeConfig): { group: THREE.Group; trunkMat: THREE.MeshPhongMaterial; foliageMat: THREE.MeshPhongMaterial } {
    const tree = new THREE.Group();
    const trunkH = 0.8 + variant * 0.3;
    const trunkGeo = new THREE.CylinderGeometry(0.1, 0.15, trunkH, 6);
    const trunkMat = new THREE.MeshPhongMaterial({ color: hexToColor(theme.trunkColor) });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = trunkH / 2;
    tree.add(trunk);

    const [fh, fs, fl] = theme.foliageHSL;
    const foliageMat = new THREE.MeshPhongMaterial({
      color: new THREE.Color().setHSL(fh + variant * 0.05, fs, fl + variant * 0.08),
      flatShading: true,
    });
    this.currentFoliage.copy(foliageMat.color);

    const leafCount = 3 + Math.floor(variant * 2);
    for (let i = 0; i < leafCount; i++) {
      const r = 0.55 - i * 0.1 + variant * 0.05;
      const h = 0.6 + variant * 0.15;
      const y = trunkH + i * (h * 0.55);
      const coneGeo = new THREE.ConeGeometry(r, h, 6 + i * 2);
      const cone = new THREE.Mesh(coneGeo, foliageMat);
      cone.position.y = y;
      tree.add(cone);
    }

    return { group: tree, trunkMat, foliageMat };
  }

  private createTrees(theme: ThemeConfig): void {
    for (const def of TREE_DEFS) {
      const variant = Math.random();
      const { group, trunkMat, foliageMat } = this.createTree(variant, theme);
      group.position.set(def.x, -4.2, def.z);
      group.scale.setScalar(0.6 + variant * 0.7);
      this.scene.add(group);
      this.trees.push(group);
      this.trunkMaterials.push(trunkMat);
      this.foliageMaterials.push(foliageMat);
      this.currentTrunk.copy(trunkMat.color);
    }
  }

  private createGround(theme: ThemeConfig): void {
    const groundGeo = new THREE.PlaneGeometry(18, 5);
    this.groundMat = new THREE.MeshPhongMaterial({ color: hexToColor(theme.groundColor) });
    this.currentGround.copy(this.groundMat.color);
    this.ground = new THREE.Mesh(groundGeo, this.groundMat);
    this.ground.position.y = -5.2;
    this.ground.rotation.x = -0.15;
    this.scene.add(this.ground);
  }

  private createSnow(theme: ThemeConfig): void {
    this.snowCount = isMobileDevice() ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
    const positions = new Float32Array(this.snowCount * 3);
    this.particles = [];

    for (let i = 0; i < this.snowCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * SNOW_AREA_WIDTH;
      positions[i * 3 + 1] = Math.random() * (SNOW_TOP - SNOW_BOTTOM) + SNOW_BOTTOM;
      positions[i * 3 + 2] = (Math.random() - 0.5) * SNOW_AREA_DEPTH;
      this.particles.push({
        velocity: 0.4 + Math.random() * 1.2,
        driftAmp: 0.2 + Math.random() * 0.5,
        driftPhase: Math.random() * Math.PI * 2,
        swayAmp: 0.3 + Math.random() * 0.6,
        swayPhase: Math.random() * Math.PI * 2,
        repelX: 0,
        repelY: 0,
      });
    }

    this.snowGeo = new THREE.BufferGeometry();
    this.snowGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const texCanvas = document.createElement('canvas');
    texCanvas.width = 32;
    texCanvas.height = 32;
    const tctx = texCanvas.getContext('2d')!;
    const gradient = tctx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, theme.snowInnerColor);
    gradient.addColorStop(0.3, 'rgba(255,255,255,0.7)');
    gradient.addColorStop(1, 'rgba(255,255,255,0)');
    tctx.fillStyle = gradient;
    tctx.fillRect(0, 0, 32, 32);

    this.snowMat = new THREE.PointsMaterial({
      size: theme.snowSize,
      map: new THREE.CanvasTexture(texCanvas),
      blending: THREE.NormalBlending,
      depthWrite: false,
      transparent: true,
      opacity: theme.snowOpacity,
    });

    this.snowPoints = new THREE.Points(this.snowGeo, this.snowMat);
    this.scene.add(this.snowPoints);
  }

  private onReducedMotionChange = (e: MediaQueryListEvent): void => {
    this.reduceMotion = e.matches;
  };

  private onPointerMove = (e: PointerEvent): void => {
    this.targetPointerX = (e.clientX / window.innerWidth) * 2 - 1;
    this.targetPointerY = -(e.clientY / window.innerHeight) * 2 + 1;
  };

  private onVisibilityChange = (): void => {
    this.isVisible = document.visibilityState === 'visible';
  };

  private setupEventListeners(): void {
    document.addEventListener('pointermove', this.onPointerMove, { passive: true });
    document.addEventListener('visibilitychange', this.onVisibilityChange);
    document.addEventListener('themekeychange', this.onThemeChange as EventListener);

    this.resizeObserver = new ResizeObserver(() => this.handleResize());
    this.resizeObserver.observe(this.canvas.parentElement || document.body);
    window.addEventListener('resize', this.handleResize);

    const io = new IntersectionObserver(
      ([entry]) => { this.isInViewport = entry.isIntersecting; },
      { threshold: 0 },
    );
    io.observe(this.canvas);
  }

  private handleResize = (): void => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.renderer.setSize(w, h);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();

    if (isMobileDevice() && this.snowCount > PARTICLE_COUNT_MOBILE) {
      this.snowCount = PARTICLE_COUNT_MOBILE;
    } else if (!isMobileDevice() && this.snowCount < PARTICLE_COUNT_DESKTOP) {
      this.snowCount = PARTICLE_COUNT_DESKTOP;
    }
  };

  /** Animate theme properties toward target */
  setTheme(isDark: boolean): void {
    this.targetTheme = isDark ? DARK_THEME : LIGHT_THEME;
  }

  private onThemeChange = (e: CustomEvent<{ dark: boolean }>): void => {
    this.setTheme(e.detail.dark);
  };

  private applyThemeTransition(dt: number): void {
    const t = Math.min(dt * 3, 1);
    const th = this.targetTheme;

    const targetClear = hexToColor(th.clearColor);
    this.currentClear.lerp(targetClear, t);
    this.renderer.setClearColor(this.currentClear);

    const targetFog = hexToColor(th.fogColor);
    this.currentFog.lerp(targetFog, t);
    this.fog.color.copy(this.currentFog);
    this.fog.near = lerp(this.fog.near, th.fogNear, t);
    this.fog.far = lerp(this.fog.far, th.fogFar, t);

    const targetAmbient = hexToColor(th.ambientColor);
    this.currentAmbient.lerp(targetAmbient, t);
    this.ambient.color.copy(this.currentAmbient);
    this.ambient.intensity = lerp(this.ambient.intensity, th.ambientIntensity, t);

    const targetDir = hexToColor(th.directionalColor);
    this.currentDirectional.lerp(targetDir, t);
    this.directional.color.copy(this.currentDirectional);
    this.directional.intensity = lerp(this.directional.intensity, th.directionalIntensity, t);
    this.directional.position.lerp(
      new THREE.Vector3(...th.directionalPosition),
      t,
    );

    const targetTrunk = hexToColor(th.trunkColor);
    this.currentTrunk.lerp(targetTrunk, t);
    for (const mat of this.trunkMaterials) {
      mat.color.copy(this.currentTrunk);
    }

    const targetFoliage = new THREE.Color().setHSL(...th.foliageHSL);
    this.currentFoliage.lerp(targetFoliage, t);
    for (const mat of this.foliageMaterials) {
      mat.color.copy(this.currentFoliage);
    }

    const targetGround = hexToColor(th.groundColor);
    this.currentGround.lerp(targetGround, t);
    this.groundMat.color.copy(this.currentGround);

    this.snowMat.opacity = lerp(this.snowMat.opacity, th.snowOpacity, t);
    this.snowMat.size = lerp(this.snowMat.size, th.snowSize, t);
  }

  private animate = (): void => {
    if (this.disposed || this.aborted) return;
    this.animationId = requestAnimationFrame(this.animate);

    const now = performance.now() / 1000;
    if (this.lastTime === 0) this.lastTime = now;
    const dt = Math.min(now - this.lastTime, 0.1);
    this.lastTime = now;
    if (dt <= 0) return;

    this.elapsedTime += dt;
    const elapsed = this.elapsedTime;

    this.applyThemeTransition(dt);

    if (!this.isVisible || !this.isInViewport) return;

    // --- Cursor interpolation ---
    const dampFactor = 2.5;
    this.pointerX += (this.targetPointerX - this.pointerX) * dampFactor * dt;
    this.pointerY += (this.targetPointerY - this.pointerY) * dampFactor * dt;

    const dx = this.pointerX - this.lastCursorX;
    const dy = this.pointerY - this.lastCursorY;
    const rawSpeed = Math.sqrt(dx * dx + dy * dy) / Math.max(dt, 0.001);
    this.cursorSpeed += (rawSpeed - this.cursorSpeed) * 4 * dt;
    this.lastCursorX = this.pointerX;
    this.lastCursorY = this.pointerY;

    const forceMagnitude = CURSOR_FORCE_BASE + this.cursorSpeed * CURSOR_FORCE_SPEED;
    const cursorWorldX = this.pointerX * 8;
    const cursorWorldY = this.pointerY * 5 + 1.5;

    const posAttr = this.snowGeo.attributes.position;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < this.snowCount; i++) {
      const idx = i * 3;
      const p = this.particles[i];

      let px = arr[idx];
      let py = arr[idx + 1];

      // Cursor repulsion
      if (!this.reduceMotion) {
        const distX = px - cursorWorldX;
        const distY = py - cursorWorldY;
        const dist = Math.sqrt(distX * distX + distY * distY);
        if (dist < CURSOR_RADIUS && dist > 0.001) {
          const falloff = 1 - dist / CURSOR_RADIUS;
          const strength = falloff * falloff * forceMagnitude;
          const nx = distX / dist;
          const ny = distY / dist;
          p.repelX += nx * strength * dt * 8;
          p.repelY += ny * strength * dt * 8;
        }
      }

      // Apply repel with damping
      p.repelX += (0 - p.repelX) * 2 * dt;
      p.repelY += (0 - p.repelY) * 2 * dt;

      if (this.reduceMotion) {
        // Minimal movement for reduced motion
        arr[idx + 1] -= p.velocity * dt * 0.15;
      } else {
        arr[idx + 1] -= p.velocity * dt;
        arr[idx] += Math.sin(elapsed * 0.8 + p.driftPhase) * p.driftAmp * dt;
        arr[idx] += Math.cos(elapsed * 1.3 + p.swayPhase) * p.swayAmp * dt * 0.3;
      }

      arr[idx] += p.repelX * dt;
      arr[idx + 1] += p.repelY * dt;

      // Reset off-screen particles
      if (arr[idx + 1] < SNOW_BOTTOM) {
        arr[idx + 1] = SNOW_TOP + Math.random() * 2;
        arr[idx] = (Math.random() - 0.5) * SNOW_AREA_WIDTH;
        arr[idx + 2] = (Math.random() - 0.5) * SNOW_AREA_DEPTH;
      }
      if (arr[idx] > 9) arr[idx] = -9;
      if (arr[idx] < -9) arr[idx] = 9;
    }
    posAttr.needsUpdate = true;

    // Camera parallax
    if (!this.reduceMotion) {
      const targetCamX = this.pointerX * CAMERA_PARALLAX;
      const targetCamY = 1.5 + this.pointerY * 0.3;
      this.camera.position.x += (targetCamX - this.camera.position.x) * 1.5 * dt;
      this.camera.position.y += (targetCamY - this.camera.position.y) * 1.5 * dt;
      this.camera.lookAt(this.pointerX * 0.5, 0.5, 0);
    }

    this.renderer.render(this.scene, this.camera);
  };

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.animationId);
    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('visibilitychange', this.onVisibilityChange);
    document.removeEventListener('themekeychange', this.onThemeChange as EventListener);
    window.removeEventListener('resize', this.handleResize);
    this.resizeObserver?.disconnect();
    window.matchMedia('(prefers-reduced-motion: reduce)').removeEventListener('change', this.onReducedMotionChange);

    this.scene?.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        obj.geometry?.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((m) => m.dispose());
        } else {
          obj.material?.dispose();
        }
      }
    });
    this.snowGeo?.dispose();
    this.snowMat?.dispose();
    this.renderer?.dispose();
  }
}
