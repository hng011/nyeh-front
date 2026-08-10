<script setup lang="ts">
const name = 'Hans Naufal Granito';
const roles = ['AI/ML Engineer', 'Software Developer', 'Cloud-Native (GCP, Azure)'];
const tagline =
  'Building intelligent systems at the intersection of machine learning, cloud infrastructure, and software engineering.';
const certifications = [
  'Certified Associate Data Scientist (BNSP)',
  'TensorFlow Developer (DCML / DeepLearning.AI)',
];
</script>

<template>
  <section id="hero" data-pin-outer>
    <div data-pin-inner class="z-10 items-center justify-center bg-white dark:bg-slate-950">
      <div
        aria-hidden="true"
        data-mouse-parallax="24"
        class="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-[36rem] w-[36rem] rounded-full bg-gradient-to-br from-slate-300/30 dark:from-slate-400/[0.16] via-slate-200/15 dark:via-slate-500/[0.08] to-transparent blur-3xl"
      />
      <div
        aria-hidden="true"
        data-mouse-parallax="-18"
        class="pointer-events-none absolute top-1/3 -right-24 h-80 w-80 rounded-full bg-gradient-to-bl from-slate-300/20 dark:from-slate-400/[0.1] to-transparent blur-3xl"
      />
      <div data-pin-content class="relative w-full px-6 py-24">
        <div data-parallax class="max-w-5xl mx-auto text-center">
          <h1
            data-reveal
            class="whitespace-nowrap text-[clamp(1.75rem,8vw,7.5rem)] font-bold tracking-tighter mb-8 text-slate-900 dark:text-slate-100"
          >
            {{ name }}
          </h1>
          <div class="flex flex-col items-center mb-8 leading-[0.95]">
            <span
              v-for="(role, idx) in roles"
              :key="role"
              data-reveal
              :style="{ '--reveal-delay': `${40 + idx * 80}ms` }"
              class="text-3xl md:text-5xl font-semibold tracking-tight"
              :class="idx === 1 ? 'text-slate-900 dark:text-slate-100' : 'text-slate-300 dark:text-slate-700'"
            >
              {{ role }}
            </span>
          </div>
          <p
            data-reveal
            style="--reveal-delay: 240ms"
            class="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto leading-relaxed mb-8"
          >
            {{ tagline }}
          </p>
          <div data-reveal style="--reveal-delay: 280ms" class="flex flex-wrap justify-center gap-3">
            <span
              v-for="cert in certifications"
              :key="cert"
              class="inline-flex items-center rounded-full bg-slate-100 dark:bg-slate-800 px-4 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              {{ cert }}
            </span>
          </div>
          <div data-reveal style="--reveal-delay: 320ms" class="mt-10 flex justify-center">
            <a
              href="#experience"
              class="group inline-flex items-center gap-3 rounded-full bg-slate-900 dark:bg-slate-100 pl-6 pr-1.5 py-1.5 text-sm font-medium text-white dark:text-slate-900 shadow-lg shadow-slate-900/10 dark:shadow-black/20 transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105 active:scale-95"
            >
              View Experience
              <span
                class="flex h-8 w-8 items-center justify-center rounded-full bg-white/10 dark:bg-slate-900/10 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
