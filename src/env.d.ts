/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_WS_ENDPOINT?: string;
  readonly PUBLIC_WS_CONFIG_PASSWORD_HASH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
