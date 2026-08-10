<script setup lang="ts">
import type { Project } from '../utils/types';
import { projects } from '../utils/data';
</script>

<template>
  <section id="projects" data-pin-outer>
    <div
      data-pin-inner
      class="z-30 items-start bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-white/10"
    >
      <div data-pin-content class="w-full px-6 py-24">
        <div class="max-w-5xl mx-auto w-full">
          <h2
            data-reveal
            class="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 dark:text-slate-100 mb-16 text-center"
          >
            Projects
          </h2>
          <div class="grid gap-6 md:grid-cols-2">
            <div
              v-for="(project, idx) in projects"
              :key="idx"
              data-reveal
              data-spotlight
              data-tilt
              :style="{ '--reveal-delay': `${(idx % 2) * 100}ms` }"
              class="rounded-xl border border-slate-200 dark:border-white/10 bg-white dark:bg-slate-900/60 dark:backdrop-blur-md p-6 flex flex-col hover:border-slate-400 dark:hover:border-white/20"
            >
              <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">{{ project.title }}</h3>
              <p class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4 flex-1">
                {{ project.description }}
              </p>
              <div class="mb-4">
                <p class="text-xs uppercase tracking-wider text-slate-400 dark:text-slate-500 font-medium mb-2">
                  Outcome
                </p>
                <p class="text-sm text-slate-600 dark:text-slate-400 italic">{{ project.outcome }}</p>
              </div>
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tech in project.techStack"
                  :key="tech"
                  class="inline-flex rounded-md bg-slate-100 dark:bg-slate-700 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300"
                >
                  {{ tech }}
                </span>
              </div>
              <a
                v-if="project.link"
                :href="project.link"
                target="_blank"
                rel="noopener noreferrer"
                class="group/link mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors w-fit"
              >
                View project
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-3.5 w-3.5 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
