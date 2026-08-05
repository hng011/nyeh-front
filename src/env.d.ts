/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_WS_ENDPOINT?: string;
  readonly PUBLIC_WS_CONFIG_PASSWORD_HASH?: string;
  readonly PUBLIC_WS_API_SECRET_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
