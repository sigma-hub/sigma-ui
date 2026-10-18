import type { GrammarState, HighlighterCore, LanguageInput, ThemeInput, ThemedToken } from 'shiki/core';
import type { CodeToken } from './lines';

/**
 * Languages that can be highlighted. Each one is a separate chunk that loads the
 * first time a block uses it. Add or remove entries to change what your app ships.
 */
export const codeBlockLanguages: Record<string, LanguageInput> = {
  bash: () => import('shiki/langs/shellscript.mjs'),
  css: () => import('shiki/langs/css.mjs'),
  diff: () => import('shiki/langs/diff.mjs'),
  html: () => import('shiki/langs/html.mjs'),
  javascript: () => import('shiki/langs/javascript.mjs'),
  json: () => import('shiki/langs/json.mjs'),
  jsx: () => import('shiki/langs/jsx.mjs'),
  markdown: () => import('shiki/langs/markdown.mjs'),
  python: () => import('shiki/langs/python.mjs'),
  sql: () => import('shiki/langs/sql.mjs'),
  tsx: () => import('shiki/langs/tsx.mjs'),
  typescript: () => import('shiki/langs/typescript.mjs'),
  vue: () => import('shiki/langs/vue.mjs'),
  yaml: () => import('shiki/langs/yaml.mjs'),
};

/** Other names for the languages above. */
export const codeBlockLanguageAliases: Record<string, string> = {
  console: 'bash',
  js: 'javascript',
  jsonc: 'json',
  md: 'markdown',
  mjs: 'javascript',
  py: 'python',
  sh: 'bash',
  shell: 'bash',
  shellscript: 'bash',
  ts: 'typescript',
  yml: 'yaml',
  zsh: 'bash',
};

// The default theme. Its colors are `--code-block-*` CSS variables that follow the sigma theme and dark mode.
const CODE_BLOCK_THEME_NAME = 'sigma-code-block';

/** `'sigma'` follows the theme tokens. A pair of shiki themes switches with the `.dark` class. */
export type CodeBlockThemes = 'sigma' | { light: ThemeInput; dark: ThemeInput };

export interface CodeBlockHighlightOptions {
  themes?: CodeBlockThemes;
}

export interface LoadedCodeBlockHighlighter {
  /** The resolved language name. */
  language: string;
  /** Tokenizes code into one token array per line. Pass `state` to continue from a previous chunk. */
  highlight: (code: string, state?: GrammarState) => { lines: CodeToken[][]; state?: GrammarState };
}

let highlighterPromise: Promise<HighlighterCore> | undefined;
const themeNames = /* @__PURE__ */ new WeakMap<object, Promise<string>>();
const themeKeys = /* @__PURE__ */ new WeakMap<object, number>();
let nextThemeKey = 0;
const loaded = /* @__PURE__ */ new Map<string, Promise<LoadedCodeBlockHighlighter>>();

// shiki is imported on first use, so pages without highlighted code don't load it.
async function createHighlighter() {
  const [{ createCssVariablesTheme, createHighlighterCore }, { createJavaScriptRegexEngine }] = await Promise.all([
    import('shiki/core'),
    import('shiki/engine/javascript'),
  ]);

  return createHighlighterCore({
    themes: [createCssVariablesTheme({
      name: CODE_BLOCK_THEME_NAME,
      variablePrefix: '--code-block-',
      variableDefaults: {},
      fontStyle: true,
    })],
    langs: [],
    engine: createJavaScriptRegexEngine({ forgiving: true }),
  });
}

function getHighlighter() {
  highlighterPromise ??= createHighlighter().catch((error: unknown) => {
    highlighterPromise = undefined;
    throw error;
  });

  return highlighterPromise;
}

/** Returns the language name to load, `'ansi'`, or `null` for a language that isn't listed. */
export function resolveCodeBlockLanguage(language: string | undefined | null): string | null {
  if (!language) {
    return null;
  }

  const name = language.trim().toLowerCase();

  if (name === 'ansi') {
    return name;
  }

  if (name in codeBlockLanguages) {
    return name;
  }

  return codeBlockLanguageAliases[name] ?? null;
}

async function loadTheme(highlighter: HighlighterCore, theme: ThemeInput): Promise<string> {
  const key = theme as object;
  let name = themeNames.get(key);

  if (!name) {
    name = (async () => {
      const loaded = await (typeof theme === 'function' ? (theme as () => Promise<unknown>)() : theme);
      const resolved = ((loaded as { default?: unknown }).default ?? loaded) as { name?: string };
      await highlighter.loadTheme(resolved as ThemeInput);
      return resolved.name ?? 'custom';
    })();
    themeNames.set(key, name);
  }

  return name;
}

function fontStyleOf(token: ThemedToken): Record<string, string> {
  const style: Record<string, string> = {};
  const fontStyle = token.fontStyle ?? 0;

  if (fontStyle & 1) {
    style['font-style'] = 'italic';
  }

  if (fontStyle & 2) {
    style['font-weight'] = '600';
  }

  if (fontStyle & 4) {
    style['text-decoration'] = 'underline';
  }

  return style;
}

function getThemesKey(themes: CodeBlockThemes) {
  if (themes === 'sigma') {
    return 'sigma';
  }

  if (!themeKeys.has(themes)) {
    themeKeys.set(themes, ++nextThemeKey);
  }

  return `${themeKeys.get(themes)}`;
}

/**
 * Loads the highlighter and the language. Resolves to `null` for a language that isn't listed.
 * The same language and themes resolve to the same instance.
 */
export function loadCodeBlockHighlighter(
  language: string | undefined | null,
  options: CodeBlockHighlightOptions = {},
): Promise<LoadedCodeBlockHighlighter | null> {
  const lang = resolveCodeBlockLanguage(language);

  if (!lang) {
    return Promise.resolve(null);
  }

  const themes = options.themes ?? 'sigma';
  const key = `${lang}:${getThemesKey(themes)}`;
  let entry = loaded.get(key);

  if (!entry) {
    entry = createLoadedHighlighter(lang, themes).catch((error: unknown) => {
      loaded.delete(key);
      throw error;
    });
    loaded.set(key, entry);
  }

  return entry;
}

async function createLoadedHighlighter(lang: string, themes: CodeBlockThemes): Promise<LoadedCodeBlockHighlighter> {
  const highlighter = await getHighlighter();

  if (lang !== 'ansi' && !highlighter.getLoadedLanguages().includes(lang)) {
    await highlighter.loadLanguage(codeBlockLanguages[lang]);
  }

  const dual = themes === 'sigma'
    ? null
    : { light: await loadTheme(highlighter, themes.light), dark: await loadTheme(highlighter, themes.dark) };

  const tokenize = (code: string, state?: GrammarState) => {
    if (dual) {
      const result = highlighter.codeToTokens(code, {
        lang,
        themes: dual,
        defaultColor: false,
        grammarState: state,
      });

      return {
        state: result.grammarState,
        lines: result.tokens.map(line => line.map(token => ({
          content: token.content,
          style: { ...(token.htmlStyle as Record<string, string> | undefined) },
        }))),
      };
    }

    const result = highlighter.codeToTokens(code, { lang, theme: CODE_BLOCK_THEME_NAME, grammarState: state });

    return {
      state: result.grammarState,
      lines: result.tokens.map(line => line.map(token => ({
        content: token.content,
        style: { color: token.color ?? 'var(--code-block-foreground)', ...fontStyleOf(token) },
      }))),
    };
  };

  return {
    language: lang,
    highlight(code, state) {
      // ANSI has no grammar state, so each line is tokenized on its own.
      if (lang === 'ansi') {
        return { lines: code.split('\n').map(line => tokenize(line).lines[0] ?? []) };
      }

      return tokenize(code, state);
    },
  };
}

/**
 * Highlights code in one call, for server rendering or build time.
 * The result is plain JSON, so it can be serialized into the page payload.
 */
export async function highlightCode(
  code: string,
  language: string,
  options: CodeBlockHighlightOptions = {},
): Promise<CodeToken[][] | null> {
  const highlighter = await loadCodeBlockHighlighter(language, options);
  return highlighter ? highlighter.highlight(code).lines : null;
}
