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
    class="min-h-screen flex items-center justify-center bg-white px-6 py-24"
  >
    <div class="max-w-3xl mx-auto text-center">
      <h1 class="text-5xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
        {{ name }}
      </h1>
      <p class="text-lg md:text-xl text-slate-600 font-medium mb-4">
        {{ headline }}
      </p>
      <p class="text-base md:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed mb-8">
        {{ tagline }}
      </p>
      <div class="flex flex-wrap justify-center gap-3">
        <span
          v-for="cert in certifications"
          :key="cert"
          class="inline-flex items-center rounded-full bg-slate-100 px-4 py-1.5 text-sm font-medium text-slate-700"
        >
          {{ cert }}
        </span>
      </div>
      <div class="mt-10">
        <a
          href="#experience"
          class="inline-flex items-center gap-2 rounded-lg bg-slate-900 px-6 py-3 text-sm font-medium text-white hover:bg-slate-800 transition-colors"
        >
          View Experience
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>
