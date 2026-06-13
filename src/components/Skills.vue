<script setup lang="ts">
import type { SkillGroup } from '../utils/types';
import { skillGroups } from '../utils/data';
</script>

<template>
  <section id="skills" class="bg-slate-50 dark:bg-slate-800/50 py-24 px-6">
    <div class="max-w-5xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 dark:text-slate-100 mb-12 text-center">
        Skills & Tools
      </h2>
      <div class="grid gap-8 md:grid-cols-2">
        <div
          v-for="group in skillGroups"
          :key="group.category"
          class="rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-6"
        >
          <h3 class="text-base font-semibold text-slate-900 dark:text-slate-100 mb-4">{{ group.category }}</h3>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in group.items"
              :key="skill"
              class="inline-flex rounded-md bg-slate-100 dark:bg-slate-700 px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
