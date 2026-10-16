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

declare module 'virtual:block-sources' {
  export interface HighlightedBlockFile {
    raw: string;
    html: string;
  }

  const sources: Record<string, Record<string, Record<string, HighlightedBlockFile>>>;

  export default sources;
}

export {};
