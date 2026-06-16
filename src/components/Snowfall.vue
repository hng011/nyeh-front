<script setup lang="ts">
import { computed } from 'vue';

interface Snowflake {
  id: number;
  left: string;
  size: string;
  delay: string;
  duration: string;
  opacity: string;
}

function generateSnowflakes(count: number): Snowflake[] {
  const flakes: Snowflake[] = [];
  for (let i = 0; i < count; i++) {
    flakes.push({
      id: i,
      left: `${Math.random() * 100}%`,
      size: `${2 + Math.random() * 6}px`,
      delay: `${Math.random() * 8}s`,
      duration: `${6 + Math.random() * 10}s`,
      opacity: (0.3 + Math.random() * 0.4).toFixed(2),
    });
  }
  return flakes;
}

const leftFlakes = computed(() => generateSnowflakes(14));
const rightFlakes = computed(() => generateSnowflakes(14));
</script>

<template>
  <div class="snowfall-container" aria-hidden="true">
    <!-- Left side snow -->
    <div class="snow-side snow-side-left">
      <span
        v-for="f in leftFlakes"
        :key="'l' + f.id"
        class="snowflake"
        :style="{
          left: f.left,
          width: f.size,
          height: f.size,
          animationDelay: f.delay,
          animationDuration: f.duration,
          opacity: f.opacity,
        }"
      />
    </div>
    <!-- Right side snow -->
    <div class="snow-side snow-side-right">
      <span
        v-for="f in rightFlakes"
        :key="'r' + f.id"
        class="snowflake"
        :style="{
          left: f.left,
          width: f.size,
          height: f.size,
          animationDelay: f.delay,
          animationDuration: f.duration,
          opacity: f.opacity,
        }"
      />
    </div>
  </div>
</template>

<style scoped>
.snowfall-container {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.snow-side {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 10vw;
}

.snow-side-left {
  left: 0;
}

.snow-side-right {
  right: 0;
}

.snowflake {
  position: absolute;
  top: -10px;
  border-radius: 50%;
  background-color: rgb(255 255 255 / 0.7);
  animation: snowfall linear infinite;
}

:global(.dark) .snowflake {
  background-color: rgb(255 255 255 / 0.6);
}

@keyframes snowfall {
  0% {
    transform: translateY(-10px) rotate(0deg);
    opacity: 0;
  }
  5% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    transform: translateY(100vh) rotate(360deg);
    opacity: 0;
  }
}
</style>
