<script setup lang="ts">
import { ref } from 'vue';

const contact = {
  email: 'hansnaufalgranito@gmail.com',
  linkedin: 'https://www.linkedin.com/in/hansnaufalgranito',
  github: 'https://github.com/hng011',
};

const copied = ref(false);

async function copyEmail() {
  try {
    await navigator.clipboard.writeText(contact.email);
  } catch {
    return;
  }
  copied.value = true;
  setTimeout(() => (copied.value = false), 1800);
}
</script>

<template>
  <footer id="contact" data-pin-outer>
    <div
      data-pin-inner
      class="z-50 items-center justify-center bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/10"
    >
      <div data-pin-content class="w-full px-6 py-16">
        <div class="max-w-3xl mx-auto text-center">
      <h2
        data-reveal
        class="text-6xl md:text-8xl font-bold tracking-tighter text-slate-900 dark:text-slate-100 mb-4"
      >
        Get in touch
      </h2>
      <p data-reveal style="--reveal-delay: 80ms" class="text-slate-500 dark:text-slate-400 mb-8 max-w-md mx-auto">
        Open to opportunities in AI/ML engineering, cloud-native development, and data science.
      </p>
      <div data-reveal style="--reveal-delay: 160ms" class="flex justify-center gap-4 flex-wrap">
        <button
          type="button"
          @click="copyEmail"
          class="inline-flex items-center gap-2 rounded-full border border-slate-200 dark:border-slate-700 px-5 py-2.5 text-sm font-medium text-slate-700 dark:text-slate-300 transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105 hover:bg-slate-50 dark:hover:bg-slate-800 active:scale-95"
        >
          <svg
            v-if="!copied"
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          {{ copied ? 'Copied to clipboard' : contact.email }}
        </button>
        <a
          :href="contact.linkedin"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-full bg-slate-900 dark:bg-slate-100 dark:text-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105 hover:bg-slate-800 dark:hover:bg-white active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
          </svg>
          LinkedIn
        </a>
        <a
          :href="contact.github"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 rounded-full bg-slate-900 dark:bg-slate-100 dark:text-slate-900 px-5 py-2.5 text-sm font-medium text-white transition-[transform,background-color] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-105 hover:bg-slate-800 dark:hover:bg-white active:scale-95"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
          </svg>
          GitHub
        </a>
      </div>
          <p class="text-xs text-slate-400 dark:text-slate-500 mt-10">
            &copy; {{ new Date().getFullYear() }} Hans Naufal Granito. South Tangerang, Indonesia.
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
