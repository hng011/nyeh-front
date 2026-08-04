<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { WS_ENDPOINT_KEY, getWsEndpoint } from '../utils/wsConfig';

const GATE_KEY = 'nyeh-ws-config-unlocked';
const CONFIGURED_PASSWORD = import.meta.env.PUBLIC_WS_CONFIG_PASSWORD;

const unlocked = ref(false);
const passwordInput = ref('');
const gateError = ref('');

const endpointInput = ref('');
const saved = ref(false);

onMounted(() => {
  if (sessionStorage.getItem(GATE_KEY) === '1') unlocked.value = true;
  endpointInput.value = getWsEndpoint();
});

function unlock() {
  if (!CONFIGURED_PASSWORD) {
    gateError.value = 'No password configured for this build.';
    return;
  }
  if (passwordInput.value === CONFIGURED_PASSWORD) {
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
  <div class="mx-auto flex min-h-screen max-w-sm flex-col justify-center px-6 text-slate-900 dark:text-slate-100">
    <form v-if="!unlocked" @submit.prevent="unlock" class="space-y-3">
      <h1 class="text-lg font-semibold">WS Config</h1>
      <input
        v-model="passwordInput"
        type="password"
        placeholder="Password"
        autofocus
        class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800"
      />
      <p v-if="gateError" class="text-sm text-red-500">{{ gateError }}</p>
      <button type="submit" class="w-full rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white dark:bg-slate-100 dark:text-slate-900">
        Unlock
      </button>
    </form>

    <form v-else @submit.prevent="save" class="space-y-3">
      <h1 class="text-lg font-semibold">WS Endpoint</h1>
      <p class="text-sm text-slate-500 dark:text-slate-400">
        Overrides the chatbot websocket endpoint for this browser only.
      </p>
      <input
        v-model="endpointInput"
        type="text"
        placeholder="wss://your-agentik-host/ws/v1/chat"
        class="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-slate-400 dark:border-slate-700 dark:bg-slate-800"
      />
      <div class="flex gap-2">
        <button type="submit" class="flex-1 rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white dark:bg-slate-100 dark:text-slate-900">
          Save
        </button>
        <button type="button" @click="resetToDefault" class="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700">
          Reset
        </button>
      </div>
      <p v-if="saved" class="text-sm text-emerald-500">Saved.</p>
    </form>
  </div>
</template>
