<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { WinterScene } from '../utils/winter-scene';

const canvasRef = ref<HTMLCanvasElement | null>(null);
let scene: WinterScene | null = null;

onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const isDark = document.documentElement.classList.contains('dark');
  scene = new WinterScene(canvas, isDark);
  if (scene['aborted']) {
    scene = null;
    return;
  }

  const onThemeKeyChange = (e: Event) => {
    const detail = (e as CustomEvent<{ dark: boolean }>).detail;
    scene?.setTheme(detail.dark);
  };
  document.addEventListener('themekeychange', onThemeKeyChange);
  (canvas as any).__themeListener = onThemeKeyChange;
});

onUnmounted(() => {
  scene?.dispose();
  scene = null;
  const canvas = canvasRef.value;
  if (canvas && (canvas as any).__themeListener) {
    document.removeEventListener('themekeychange', (canvas as any).__themeListener);
  }
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
  z-index: 0;
  width: 100%;
  height: 100%;
}
</style>
