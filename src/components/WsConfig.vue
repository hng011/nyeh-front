<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { WS_ENDPOINT_KEY, getWsEndpoint } from '../utils/wsConfig';

const GATE_KEY = 'nyeh-ws-config-unlocked';
const CONFIGURED_PASSWORD_HASH = import.meta.env.PUBLIC_WS_CONFIG_PASSWORD_HASH;

const unlocked = ref(false);
const passwordInput = ref('');
const gateError = ref('');

const endpointInput = ref('');
const saved = ref(false);

onMounted(() => {
  if (sessionStorage.getItem(GATE_KEY) === '1') unlocked.value = true;
  endpointInput.value = getWsEndpoint();
});

async function sha256Hex(text: string): Promise<string> {
  const buffer = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function unlock() {
  if (!CONFIGURED_PASSWORD_HASH) {
    gateError.value = 'No password configured for this build.';
    return;
  }
  const inputHash = await sha256Hex(passwordInput.value);
  if (inputHash === CONFIGURED_PASSWORD_HASH) {
    unlocked.value = true;
    gateError.value = '';
    sessionStorage.setItem(GATE_KEY, '1');
  } else {
    gateError.value = 'Wrong password.';
  }
}

function save() {
  const value = endpointInput.value.trim();
  if (!value) return;
  localStorage.setItem(WS_ENDPOINT_KEY, value);
  saved.value = true;
  setTimeout(() => (saved.value = false), 2000);
}

function resetToDefault() {
  localStorage.removeItem(WS_ENDPOINT_KEY);
  endpointInput.value = getWsEndpoint();
  saved.value = true;
  setTimeout(() => (saved.value = false), 2000);
}
</script>

<template>
  <div class="relative min-h-screen flex items-center justify-center overflow-hidden px-6 bg-white dark:bg-slate-950">
    <div
      aria-hidden="true"
      data-mouse-parallax="28"
      class="pointer-events-none absolute -top-32 -left-24 h-96 w-96 rounded-full bg-gradient-to-br from-slate-300/30 dark:from-slate-400/[0.16] to-transparent blur-3xl"
    />
    <div
      aria-hidden="true"
      data-mouse-parallax="-22"
      class="pointer-events-none absolute -bottom-32 -right-24 h-96 w-96 rounded-full bg-gradient-to-tl from-slate-300/25 dark:from-slate-400/[0.14] to-transparent blur-3xl"
    />

    <div
      data-reveal
      data-spotlight
      data-tilt
      class="relative w-full max-w-sm rounded-2xl border border-slate-200 dark:border-white/10 bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl p-8"
    >
      <span
        class="inline-block rounded-full border border-slate-200 dark:border-slate-700 px-3 py-1 text-[10px] uppercase tracking-[0.2em] font-medium text-slate-500 dark:text-slate-400 mb-6"
      >
        Internal
      </span>

      <form v-if="!unlocked" @submit.prevent="unlock" class="space-y-4">
        <h1 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">WS Config</h1>
        <input
          v-model="passwordInput"
          type="password"
          placeholder="Password"
          autofocus
          class="w-full rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-slate-400 dark:focus:border-slate-500 focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-slate-100/10 transition-all"
        />
        <p v-if="gateError" class="text-sm text-red-500">{{ gateError }}</p>
        <button
          type="submit"
          class="w-full rounded-full bg-slate-900 dark:bg-slate-100 px-4 py-2.5 text-sm font-medium text-white dark:text-slate-900 shadow-lg shadow-slate-900/10 dark:shadow-black/20 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.98]"
        >
          Unlock
        </button>
      </form>

      <form v-else @submit.prevent="save" class="space-y-4">
        <h1 class="text-2xl font-bold tracking-tight text-slate-900 dark:text-slate-100">WS Endpoint</h1>
        <p class="text-sm text-slate-500 dark:text-slate-400">
          Overrides the chatbot websocket endpoint for this browser only.
        </p>
        <input
          v-model="endpointInput"
          type="text"
          placeholder="wss://your-agentik-host/ws/v1/chat"
          class="w-full rounded-full border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 py-2.5 text-sm text-slate-900 dark:text-slate-100 outline-none focus:border-slate-400 dark:focus:border-slate-500 focus:ring-2 focus:ring-slate-900/10 dark:focus:ring-slate-100/10 transition-all"
        />
        <div class="flex gap-2">
          <button
            type="submit"
            class="flex-1 rounded-full bg-slate-900 dark:bg-slate-100 px-4 py-2.5 text-sm font-medium text-white dark:text-slate-900 shadow-lg shadow-slate-900/10 dark:shadow-black/20 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Save
          </button>
          <button
            type="button"
            @click="resetToDefault"
            class="flex-1 rounded-full border border-slate-200 dark:border-slate-700 px-4 py-2.5 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
          >
            Reset
          </button>
        </div>
        <p v-if="saved" class="text-sm text-emerald-500">Saved.</p>
      </form>
    </div>
  </div>
</template>
