<script setup lang="ts">
import type { Project } from '../utils/types';
import { projects } from '../utils/data';
</script>

<template>
  <section id="projects" class="bg-white dark:bg-slate-900 py-24 px-6">
    <div class="max-w-5xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-12 text-center">
        Projects
      </h2>
      <div class="grid gap-6 md:grid-cols-2">
        <div
          v-for="(project, idx) in projects"
          :key="idx"
          class="rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 flex flex-col hover:border-slate-300 dark:hover:border-slate-600 hover:shadow-sm transition-all"
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
          <div class="flex flex-wrap gap-2 mt-auto">
            <span
              v-for="tech in project.techStack"
              :key="tech"
              class="inline-flex rounded-md bg-slate-100 dark:bg-slate-700 px-2.5 py-1 text-xs font-medium text-slate-600 dark:text-slate-300"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
