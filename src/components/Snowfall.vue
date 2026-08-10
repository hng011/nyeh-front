<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

interface Flake {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  drift: number;
  driftPhase: number;
  opacity: number;
  side: 'left' | 'right';
}

const REPEL_RADIUS = 110;
const REPEL_FORCE = 1.3;
const FRICTION = 0.9;
const BAND_RATIO = 0.14;

const canvasRef = ref<HTMLCanvasElement | null>(null);
let ctx: CanvasRenderingContext2D | null = null;
let flakes: Flake[] = [];
let mouseX = -9999;
let mouseY = -9999;
let rafId = 0;
let width = 0;
let height = 0;
let isDark = false;

// Keep clear of the outer ~20px on the right — that's roughly where an
// overlay-style OS scrollbar renders, and flakes drawn under/over it made it
// unreadable.
const EDGE_GUTTER = 20;

function bandRange(side: 'left' | 'right') {
  const bandWidth = width * BAND_RATIO;
  return side === 'left' ? [0, bandWidth] : [width - bandWidth, width - EDGE_GUTTER];
}

function makeFlake(side: 'left' | 'right', spawnAtTop = false): Flake {
  const [min, max] = bandRange(side);
  return {
    x: min + Math.random() * (max - min),
    y: spawnAtTop ? -20 : Math.random() * height,
    r: 1.5 + Math.random() * 4.5,
    vy: 0.25 + Math.random() * 0.55,
    vx: 0,
    drift: 0.2 + Math.random() * 0.35,
    driftPhase: Math.random() * Math.PI * 2,
    opacity: 0.15 + Math.random() * 0.25,
    side,
  };
}

function resize() {
  const canvas = canvasRef.value;
  if (!canvas) return;
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;
}

function onMouseMove(e: MouseEvent) {
  mouseX = e.clientX;
  mouseY = e.clientY;
}

function onMouseLeave() {
  mouseX = -9999;
  mouseY = -9999;
}

function tick(time: number) {
  if (!ctx) return;
  ctx.clearRect(0, 0, width, height);
  // White-on-dark reads fine at low opacity; slate-on-white needs more
  // contrast and more opacity to register as visible at all.
  const color = isDark ? '255 255 255' : '100 116 139';
  const opacityScale = isDark ? 1 : 2.4;

  for (const f of flakes) {
    f.y += f.vy;
    f.x += Math.sin(time * 0.00035 + f.driftPhase) * f.drift * 0.25 + f.vx;
    f.vx *= FRICTION;

    const dx = f.x - mouseX;
    const dy = f.y - mouseY;
    const dist = Math.hypot(dx, dy);
    if (dist < REPEL_RADIUS && dist > 0.01) {
      const force = (1 - dist / REPEL_RADIUS) * REPEL_FORCE;
      f.vx += (dx / dist) * force;
      f.vy = Math.max(0.15, f.vy - (dy / dist) * force * 0.15);
    }

    if (f.y > height + 20) {
      Object.assign(f, makeFlake(f.side, true));
    }

    const [bandMin, bandMax] = bandRange(f.side);
    if (f.x < bandMin) {
      f.x = bandMin;
      f.vx = Math.abs(f.vx) * 0.3;
    } else if (f.x > bandMax) {
      f.x = bandMax;
      f.vx = -Math.abs(f.vx) * 0.3;
    }

    ctx.beginPath();
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgb(${color} / ${Math.min(0.85, f.opacity * opacityScale)})`;
    ctx.fill();
  }

  rafId = requestAnimationFrame(tick);
}

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;

  const canvas = canvasRef.value;
  if (!canvas) return;
  ctx = canvas.getContext('2d');
  if (!ctx) return;

  isDark = document.documentElement.classList.contains('dark');
  const themeObserver = new MutationObserver(() => {
    isDark = document.documentElement.classList.contains('dark');
  });
  themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

  resize();
  flakes = Array.from({ length: 24 }, (_, i) => makeFlake(i % 2 === 0 ? 'left' : 'right'));

  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', onMouseMove, { passive: true });
  window.addEventListener('mouseleave', onMouseLeave);
  rafId = requestAnimationFrame(tick);

  onUnmounted(() => {
    cancelAnimationFrame(rafId);
    themeObserver.disconnect();
    window.removeEventListener('resize', resize);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseleave', onMouseLeave);
  });
});
</script>

<template>
  <canvas ref="canvasRef" class="snowfall-canvas" aria-hidden="true" />
</template>

<style scoped>
.snowfall-canvas {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 52;
  width: 100vw;
  height: 100vh;
}
</style>
