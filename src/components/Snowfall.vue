<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import * as THREE from 'three';

const canvasRef = ref<HTMLCanvasElement | null>(null);

let animationId = 0;
let renderer: THREE.WebGLRenderer | null = null;

interface SnowParticle {
  velocity: number;
  driftAmp: number;
  driftPhase: number;
  swayAmp: number;
  swayPhase: number;
}

function createTree(variant: number): THREE.Group {
  const tree = new THREE.Group();

  const trunkH = 0.8 + variant * 0.3;
  const trunkGeo = new THREE.CylinderGeometry(0.1, 0.15, trunkH, 6);
  const trunkMat = new THREE.MeshPhongMaterial({ color: 0x5c3a1e });
  const trunk = new THREE.Mesh(trunkGeo, trunkMat);
  trunk.position.y = trunkH / 2;
  tree.add(trunk);

  const foliageMat = new THREE.MeshPhongMaterial({
    color: new THREE.Color().setHSL(0.28 + variant * 0.05, 0.5, 0.25 + variant * 0.08),
    flatShading: true,
  });

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

  return tree;
}

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const testCtx = canvas.getContext('webgl2') || canvas.getContext('webgl');
  if (!testCtx) return;

  renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0xdfe8f0, 4, 18);

  const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    40,
  );
  camera.position.set(0, 1.5, 9);
  camera.lookAt(0, 0.5, 0);

  const ambient = new THREE.AmbientLight(0x8899bb, 0.7);
  scene.add(ambient);

  const moon = new THREE.DirectionalLight(0xaaccff, 0.5);
  moon.position.set(3, 8, 2);
  scene.add(moon);

  // --- Snow particles ---
  const snowCount = 1000;
  const positions = new Float32Array(snowCount * 3);
  const particles: SnowParticle[] = [];

  for (let i = 0; i < snowCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 1] = Math.random() * 12 - 2;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 6;

    particles.push({
      velocity: 0.4 + Math.random() * 1.2,
      driftAmp: 0.2 + Math.random() * 0.5,
      driftPhase: Math.random() * Math.PI * 2,
      swayAmp: 0.3 + Math.random() * 0.6,
      swayPhase: Math.random() * Math.PI * 2,
    });
  }

  const snowGeo = new THREE.BufferGeometry();
  snowGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const texCanvas = document.createElement('canvas');
  texCanvas.width = 32;
  texCanvas.height = 32;
  const tctx = texCanvas.getContext('2d')!;
  const gradient = tctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, 'rgba(255,255,255,1)');
  gradient.addColorStop(0.3, 'rgba(255,255,255,0.7)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  tctx.fillStyle = gradient;
  tctx.fillRect(0, 0, 32, 32);

  const snowTexture = new THREE.CanvasTexture(texCanvas);
  const snowMat = new THREE.PointsMaterial({
    size: 0.18,
    map: snowTexture,
    blending: THREE.NormalBlending,
    depthWrite: false,
    transparent: true,
    opacity: 0.85,
  });

  const snowPoints = new THREE.Points(snowGeo, snowMat);
  scene.add(snowPoints);

  // --- Trees ---
  const treeDefs = [
    { x: -5.5, z: 0 }, { x: -3.8, z: 1.8 }, { x: -2.0, z: -1.2 },
    { x: -0.2, z: 2.0 }, { x: 1.8, z: -1.5 }, { x: 3.6, z: 0.8 },
    { x: 5.5, z: -0.5 },
  ];

  for (const def of treeDefs) {
    const variant = Math.random();
    const tree = createTree(variant);
    tree.position.set(def.x, -4.2, def.z);
    tree.scale.setScalar(0.6 + variant * 0.7);
    scene.add(tree);
  }

  // --- Snow-covered ground ---
  const groundGeo = new THREE.PlaneGeometry(18, 5);
  const groundMat = new THREE.MeshPhongMaterial({ color: 0xe8eef5 });
  const ground = new THREE.Mesh(groundGeo, groundMat);
  ground.position.y = -5.2;
  ground.rotation.x = -0.15;
  scene.add(ground);

  // --- Resize handler ---
  const onResize = () => {
    if (!renderer) return;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  };
  window.addEventListener('resize', onResize);
  onResize();

  // --- Animation loop ---
  const clock = new THREE.Clock();

  function animate() {
    animationId = requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.1);
    const elapsed = clock.elapsedTime;

    const posAttr = snowGeo.attributes.position;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < snowCount; i++) {
      const idx = i * 3;
      const p = particles[i];

      arr[idx + 1] -= p.velocity * dt;
      arr[idx] += Math.sin(elapsed * 0.8 + p.driftPhase) * p.driftAmp * dt;
      arr[idx] += Math.cos(elapsed * 1.3 + p.swayPhase) * p.swayAmp * dt * 0.3;

      if (arr[idx + 1] < -5.5) {
        arr[idx + 1] = 6 + Math.random() * 2;
        arr[idx] = (Math.random() - 0.5) * 16;
        arr[idx + 2] = (Math.random() - 0.5) * 6;
      }

      if (arr[idx] > 8) arr[idx] = -8;
      if (arr[idx] < -8) arr[idx] = 8;
    }
    posAttr.needsUpdate = true;

    renderer!.render(scene, camera);
  }

  animate();
});

onUnmounted(() => {
  cancelAnimationFrame(animationId);
  renderer?.dispose();
});
</script>

<template>
  <canvas
    ref="canvasRef"
    class="snowfall-canvas"
    aria-hidden="true"
    data-testid="snowfall-canvas"
  />
</template>

<style scoped>
.snowfall-canvas {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  width: 100%;
  height: 100%;
}
</style>
