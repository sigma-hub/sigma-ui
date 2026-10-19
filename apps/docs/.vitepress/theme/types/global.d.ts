declare global {
  interface Document {
    startViewTransition?: (callback: () => void) => void;
  }

  interface ImportMetaEnv {
    readonly VITE_APP_VERSION: string;
    readonly SSR: boolean;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
    glob<Module = unknown>(pattern: string): Record<string, () => Promise<Module>>;
  }
}

declare module 'virtual:block-sources' {
  export interface HighlightedBlockFile {
    raw: string;
    html: string;
  }

  const sources: Record<string, Record<string, Record<string, HighlightedBlockFile>>>;

  export default sources;
}

export {};
