// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://kaktus.foo',

  integrations: [vue()],

  vite: {
    plugins: [tailwindcss()],
  },
});
