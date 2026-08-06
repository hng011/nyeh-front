<script setup lang="ts">
import { ref, nextTick, onBeforeUnmount } from 'vue';
import { getWsEndpoint, getSessionEndpoint } from '../utils/wsConfig';

type Message = { role: 'user' | 'bot'; text: string };
type Status = 'idle' | 'connecting' | 'open' | 'error';

const SESSION_KEY = 'nyeh-chat-session';
// ponytail: mirrors agentik WS_MAX_MSG_SIZE; bump if backend .env changes
const MAX_MESSAGE_LENGTH = 4096;

const isOpen = ref(false);
const status = ref<Status>('idle');
const messages = ref<Message[]>([]);
const draft = ref('');
const isWaiting = ref(false);
const scrollEl = ref<HTMLElement | null>(null);

let socket: WebSocket | null = null;
let retryCount = 0;
let retryTimer: ReturnType<typeof setTimeout> | null = null;
const pendingMessages: string[] = [];

function getSessionId(): string {
  let id = localStorage.getItem(SESSION_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, id);
  }
  return id;
}

function scrollToBottom() {
  nextTick(() => {
    if (scrollEl.value) scrollEl.value.scrollTop = scrollEl.value.scrollHeight;
  });
}

async function mintSession(): Promise<boolean> {
  try {
    const res = await fetch(getSessionEndpoint(), { credentials: 'include' });
    return res.ok;
  } catch {
    return false;
  }
}

function scheduleRetry() {
  retryCount += 1;
  const delay = Math.min(1000 * 2 ** retryCount, 15000);
  retryTimer = setTimeout(connect, delay);
}

function flushPending(ws: WebSocket) {
  while (pendingMessages.length) {
    ws.send(pendingMessages.shift()!);
    isWaiting.value = true;
  }
}

async function connect() {
  if (socket && (socket.readyState === WebSocket.OPEN || socket.readyState === WebSocket.CONNECTING)) return;

  status.value = 'connecting';

  // session_token cookie is httpOnly - never read it here, browser just
  // attaches it on the WS handshake automatically (same-site).
  if (!(await mintSession())) {
    status.value = 'error';
    scheduleRetry();
    return;
  }
  if (!isOpen.value) return; // widget closed while awaiting the session fetch

  const url = `${getWsEndpoint()}/${getSessionId()}`;
  socket = new WebSocket(url);

  socket.onopen = () => {
    status.value = 'open';
    retryCount = 0;
    flushPending(socket!);
  };

  socket.onmessage = (event) => {
    isWaiting.value = false;
    messages.value.push({ role: 'bot', text: event.data });
    scrollToBottom();
  };

  socket.onerror = () => {
    status.value = 'error';
  };

  socket.onclose = (event) => {
    if (!isOpen.value) return;
    // 1000 now also covers server idle-timeout closes - reconnect quietly
    // instead of flashing the offline error banner.
    status.value = event.code === 1000 ? 'connecting' : 'error';
    scheduleRetry();
  };
}

function disconnect() {
  if (retryTimer) clearTimeout(retryTimer);
  socket?.close();
  socket = null;
}

function toggleOpen() {
  isOpen.value = !isOpen.value;
  if (isOpen.value) {
    connect();
    scrollToBottom();
  } else {
    disconnect();
  }
}

function send() {
  const text = draft.value.trim();
  if (!text || text.length > MAX_MESSAGE_LENGTH || status.value !== 'open') return;

  messages.value.push({ role: 'user', text });
  draft.value = '';
  scrollToBottom();

  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(text);
    isWaiting.value = true;
  } else {
    pendingMessages.push(text);
  }
}

onBeforeUnmount(disconnect);
</script>

<template>
  <div class="fixed bottom-5 right-5 z-50 flex flex-col items-end">
    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div v-if="isOpen" class="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm dark:bg-black/60" @click="toggleOpen" />
    </Transition>

    <Transition
      enter-active-class="transition ease-out duration-200"
      enter-from-class="opacity-0 scale-95 translate-y-4"
      enter-to-class="opacity-100 scale-100 translate-y-0"
      leave-active-class="transition ease-in duration-150"
      leave-from-class="opacity-100 scale-100 translate-y-0"
      leave-to-class="opacity-0 scale-95 translate-y-4"
    >
      <div
        v-if="isOpen"
        class="fixed inset-x-4 top-[6vh] bottom-[6vh] z-50 mx-auto flex max-w-2xl flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl dark:border-slate-700 dark:bg-slate-900"
        @click.stop
      >
        <div class="flex items-center justify-between border-b border-slate-100 px-4 py-3 dark:border-slate-800">
          <div class="flex items-center gap-2">
            <span
              class="h-2 w-2 rounded-full"
              :class="{
                'bg-emerald-500': status === 'open',
                'bg-amber-400 animate-pulse': status === 'connecting',
                'bg-red-500': status === 'error',
                'bg-slate-300 dark:bg-slate-600': status === 'idle',
              }"
            />
            <h3 class="text-sm font-semibold text-slate-900 dark:text-slate-100">Nyeh Bot</h3>
          </div>
          <button
            @click="toggleOpen"
            aria-label="Close chat"
            class="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div
          v-if="status === 'error' || status === 'connecting'"
          class="flex items-center gap-2 border-b px-4 py-2 text-xs font-medium"
          :class="
            status === 'error'
              ? 'border-red-100 bg-red-50 text-red-600 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-400'
              : 'border-amber-100 bg-amber-50 text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-400'
          "
        >
          <span>{{ status === 'error' ? "yo, i'm offline right now, server's down on my side so nothing's coming through, no point typing till it's back" : 'connecting… gimme a sec ⚡' }}</span>
        </div>

        <div ref="scrollEl" class="flex-1 overflow-y-auto px-4 py-4">
          <div class="mx-auto max-w-2xl space-y-3">
            <p v-if="messages.length === 0" class="text-sm text-slate-400 dark:text-slate-500">
              Ask me anything about Hans's work, skills, or experience.
            </p>
            <div v-for="(m, i) in messages" :key="i" class="flex" :class="m.role === 'user' ? 'justify-end' : 'justify-start'">
              <div
                class="max-w-[85%] rounded-2xl px-3.5 py-2 text-sm whitespace-pre-wrap"
                :class="
                  m.role === 'user'
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 rounded-br-sm'
                    : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-100 rounded-bl-sm'
                "
              >
                {{ m.text }}
              </div>
            </div>
            <div v-if="isWaiting" class="flex justify-start">
              <div class="flex items-center gap-1 rounded-2xl rounded-bl-sm bg-slate-100 px-3.5 py-2.5 dark:bg-slate-800">
                <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.3s]" />
                <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400 [animation-delay:-0.15s]" />
                <span class="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" />
              </div>
            </div>
          </div>
        </div>

        <form @submit.prevent="send" class="border-t border-slate-100 p-3 dark:border-slate-800">
          <div class="mx-auto flex max-w-2xl items-center gap-2">
            <input
              v-model="draft"
              type="text"
              :disabled="status !== 'open'"
              :placeholder="status === 'open' ? 'Type a message…' : status === 'error' ? 'brb, reconnecting…' : 'Connecting…'"
              class="flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-400 disabled:opacity-50 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-slate-500"
            />
            <button
              type="submit"
              :disabled="status !== 'open' || !draft.trim()"
              aria-label="Send message"
              class="rounded-lg bg-slate-900 p-2.5 text-white transition-colors hover:bg-slate-700 disabled:opacity-40 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 19V5m0 0l-6 6m6-6l6 6" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </Transition>

    <button
      v-if="!isOpen"
      @click="toggleOpen"
      aria-label="Open chat"
      class="flex h-14 w-14 cursor-pointer items-center justify-center rounded-full bg-slate-900 text-white shadow-lg transition-transform hover:scale-105 dark:bg-slate-100 dark:text-slate-900"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    </button>
  </div>
</template>
