<script setup lang="ts">
import type { SkillGroup } from '../utils/types';
import { skillGroups } from '../utils/data';
</script>

<template>
  <section id="skills" data-pin-outer>
    <div
      data-pin-inner
      class="z-40 items-start bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-white/10"
    >
      <div data-pin-content class="w-full px-6 py-24">
        <div class="max-w-5xl mx-auto w-full">
          <h2
            data-reveal
            class="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 dark:text-slate-100 mb-16 text-center"
          >
            Skills & tools
          </h2>
          <div class="grid gap-8 md:grid-cols-2">
            <div
              v-for="(group, idx) in skillGroups"
              :key="group.category"
              data-reveal
              data-spotlight
              data-tilt
              :style="{ '--reveal-delay': `${(idx % 2) * 100}ms` }"
              class="rounded-xl bg-white dark:bg-slate-900/60 dark:backdrop-blur-md border border-slate-200 dark:border-white/10 p-6 hover:border-slate-400 dark:hover:border-white/20"
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
      </div>
    </div>
  </section>
</template>
