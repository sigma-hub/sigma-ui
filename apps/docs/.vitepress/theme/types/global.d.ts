declare global {
  interface Document {
    startViewTransition?: (callback: () => void) => void;
  }

  interface ImportMetaEnv {
    readonly VITE_APP_VERSION: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}

export {};
