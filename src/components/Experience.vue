<script setup lang="ts">
import type { Experience } from '../utils/types';
import { experiences } from '../utils/data';
</script>

<template>
  <section id="experience" data-pin-outer>
    <div
      data-pin-inner
      class="z-20 items-start bg-slate-100 dark:bg-slate-800 border-t border-slate-200 dark:border-white/10"
    >
      <div data-pin-content class="w-full px-6 py-24">
        <div class="max-w-4xl mx-auto w-full">
          <h2
            data-reveal
            class="text-5xl md:text-7xl font-bold tracking-tighter text-slate-900 dark:text-slate-100 mb-16 text-center"
          >
            Experience
          </h2>
          <div class="relative border-l-2 border-slate-200 dark:border-slate-700 ml-4 md:ml-8">
            <div
              id="experience-timeline-fill"
              class="absolute top-0 -left-[2px] w-[2px] bg-slate-900 dark:bg-slate-300"
            />
            <div
              v-for="(exp, idx) in experiences"
              :key="idx"
              data-reveal
              :style="{ '--reveal-delay': `${idx * 100}ms` }"
              class="mb-12 pl-8 md:pl-12 relative"
            >
              <div
                class="absolute w-3 h-3 bg-slate-900 dark:bg-slate-300 rounded-full -left-[7px] top-1.5 ring-4 ring-slate-100 dark:ring-slate-800"
              />
              <div class="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-2">
                <h3 class="text-lg font-semibold text-slate-900 dark:text-slate-100">{{ exp.title }}</h3>
                <span class="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">{{ exp.startDate }} – {{ exp.endDate }}</span>
              </div>
              <p class="text-sm text-slate-500 dark:text-slate-400 mb-1">
                {{ exp.company }} · {{ exp.location }} · <span class="italic">{{ exp.duration }}</span>
              </p>
              <ul class="mt-3 space-y-1.5">
                <li
                  v-for="(h, hIdx) in exp.highlights"
                  :key="hIdx"
                  class="text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex gap-2"
                >
                  <span class="text-slate-400 dark:text-slate-500 mt-0.5 shrink-0">▹</span>
                  <span>{{ h }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
