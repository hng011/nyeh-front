// @ts-check
import { defineConfig } from 'astro/config';

import vue from '@astrojs/vue';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://hng011.github.io',
  base: '/nyeh-front',
  integrations: [vue()],

  vite: {
    plugins: [tailwindcss()],
  },
});