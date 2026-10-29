import { createHighlighterCore, type HighlighterCore, type ThemedToken } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
import { CODE_THEME_OPTIONS, CODE_THEME_REGISTRATIONS } from '../config/shiki';

export type HighlightLanguage = 'vue' | 'typescript' | 'css';

export type HighlightedLines = ThemedToken[][];

// Grammars load on demand, so pages that never show highlighted source do not pay for them.
const LANGUAGE_LOADERS = {
  vue: () => import('shiki/langs/vue.mjs'),
  typescript: () => import('shiki/langs/typescript.mjs'),
  css: () => import('shiki/langs/css.mjs'),
} satisfies Record<HighlightLanguage, () => Promise<{ default: unknown }>>;

let highlighterPromise: Promise<HighlighterCore> | undefined;

function getHighlighter() {
  highlighterPromise ??= createHighlighterCore({
    themes: Object.values(CODE_THEME_REGISTRATIONS),
    langs: [],
    // The JavaScript regex engine produces the same tokens for the grammars used here without shipping WASM.
    engine: createJavaScriptRegexEngine(),
  });

  return highlighterPromise;
}

export function languageForFile(filePath: string): HighlightLanguage {
  if (filePath.endsWith('.vue')) {
    return 'vue';
  }

  if (filePath.endsWith('.css')) {
    return 'css';
  }

  return 'typescript';
}

/** Dual-theme tokens: every token carries `htmlStyle` with `--shiki-light` and `--shiki-dark`. */
export async function highlightLines(code: string, language: HighlightLanguage): Promise<HighlightedLines> {
  const highlighter = await getHighlighter();

  if (!highlighter.getLoadedLanguages().includes(language)) {
    await highlighter.loadLanguage((await LANGUAGE_LOADERS[language]()).default as never);
  }

  return highlighter.codeToTokens(code, {
    lang: language,
    ...CODE_THEME_OPTIONS,
  }).tokens;
}
