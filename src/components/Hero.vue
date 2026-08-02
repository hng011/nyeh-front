<script setup lang="ts">
const name = 'Hans Naufal Granito';
const headline = 'AI/ML Engineer · Software Developer · Cloud-Native (GCP, Azure)';
const tagline =
  'Building intelligent systems at the intersection of machine learning, cloud infrastructure, and software engineering.';
const certifications = [
  'Certified Associate Data Scientist (BNSP)',
  'TensorFlow Developer (DCML / DeepLearning.AI)',
];
</script>

<template>
  <section
    id="hero"
    class="min-h-screen flex items-center justify-center px-6 py-24"
  >
    <div class="max-w-3xl mx-auto text-center glass rounded-2xl p-10 md:p-14 animate-fade-in">
      <h1 class="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 mb-6 leading-tight">
        {{ name }}
      </h1>
      <p class="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium mb-4">
        {{ headline }}
      </p>
      <p class="text-base md:text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed mb-8">
        {{ tagline }}
      </p>
      <div class="flex flex-wrap justify-center gap-3">
        <span
          v-for="cert in certifications"
          :key="cert"
          class="inline-flex items-center rounded-full bg-slate-200/70 dark:bg-slate-700/70 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300"
        >
          {{ cert }}
        </span>
      </div>
      <div class="mt-10 flex flex-wrap items-center justify-center gap-4">
        <a
          href="#experience"
          class="inline-flex items-center gap-2 rounded-lg bg-slate-900 dark:bg-slate-100 dark:text-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 dark:hover:bg-white transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          View Experience
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
        <a
          href="https://github.com/hng011"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-lg border border-slate-300 dark:border-slate-600 px-6 py-3 text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </a>
      </div>
    </div>
  </section>
</template>
