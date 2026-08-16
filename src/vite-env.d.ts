/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Write-only collector URL for waitlist signups. See .env.example. */
  readonly VITE_WAITLIST_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
