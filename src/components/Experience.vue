<script setup lang="ts">
import type { Experience } from '../utils/types';
import { experiences } from '../utils/data';
</script>

<template>
  <section id="experience" class="bg-slate-50 py-24 px-6">
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl md:text-4xl font-bold tracking-tight text-slate-900 mb-12 text-center">
        Experience
      </h2>
      <div class="relative border-l-2 border-slate-200 ml-4 md:ml-8">
        <div
          v-for="(exp, idx) in experiences"
          :key="idx"
          class="mb-12 pl-8 md:pl-12 relative"
        >
          <div
            class="absolute w-3 h-3 bg-slate-900 rounded-full -left-[7px] top-1.5 ring-4 ring-slate-50"
          />
          <div class="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-2">
            <h3 class="text-lg font-semibold text-slate-900">{{ exp.title }}</h3>
            <span class="text-sm text-slate-500 whitespace-nowrap">{{ exp.startDate }} – {{ exp.endDate }}</span>
          </div>
          <p class="text-sm text-slate-500 mb-1">
            {{ exp.company }} · {{ exp.location }} · <span class="italic">{{ exp.duration }}</span>
          </p>
          <ul class="mt-3 space-y-1.5">
            <li
              v-for="(h, hIdx) in exp.highlights"
              :key="hIdx"
              class="text-sm text-slate-600 leading-relaxed flex gap-2"
            >
              <span class="text-slate-400 mt-0.5 shrink-0">▹</span>
              <span>{{ h }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
