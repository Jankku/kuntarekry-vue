/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_KUNTAREKRY_API_URL: string;
  readonly VITE_KUNTAREKRY_CLIENT_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
