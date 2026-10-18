import { existsSync } from 'node:fs';
import { readFile, writeFile } from 'node:fs/promises';
import { themeColorKeys } from '@sigma-ui/shared/themes';

const HSL_TRIPLET_PATTERN = /--([\w-]+):\s*(\d+(?:\.\d+)?)\s+(\d+(?:\.\d+)?)%\s+(\d+(?:\.\d+)?)%\s*;/g;
const HSL_TRIPLET_TEST = /--[\w-]+:\s*\d+(?:\.\d+)?\s+\d+(?:\.\d+)?%\s+\d+(?:\.\d+)?%\s*;/;

const MISSING_TOKEN_FALLBACKS: Record<string, string> = {
  'accent': 'secondary',
  'accent-foreground': 'secondary-foreground',
  'sidebar': 'background',
  'sidebar-foreground': 'foreground',
  'sidebar-primary': 'primary',
  'sidebar-primary-foreground': 'primary-foreground',
  'sidebar-accent': 'secondary',
  'sidebar-accent-foreground': 'secondary-foreground',
  'sidebar-border': 'border',
  'sidebar-ring': 'ring',
};

const TAILWIND_DIRECTIVE_PATTERN = /@tailwind\s+(base|components|utilities)\s*;\s*/g;

export interface CssMigration {
  css: string;
  changes: string[];
  instructions: string[];
}

export function cssHasHslTriplets(css: string) {
  return HSL_TRIPLET_TEST.test(css);
}

const SPACING_TOKEN_TEST = /--spacing\s*:/;
const TAILWIND_IMPORT_TEST = /@import\s+["']tailwindcss["']/;

/**
 * Whether the stylesheet gives CSS style components their `--spacing` token, either directly or through Tailwind's theme.
 */
export function cssDefinesSpacing(css: string) {
  return SPACING_TOKEN_TEST.test(css) || TAILWIND_IMPORT_TEST.test(css);
}

function insertSpacingToken(css: string) {
  const root = /:root\s*\{/.exec(css);

  if (!root) {
    return `:root {\n  --spacing: 0.25rem;\n}\n\n${css}`;
  }

  const insertAt = root.index + root[0].length;
  return `${css.slice(0, insertAt)}\n    --spacing: 0.25rem;${css.slice(insertAt)}`;
}

export function isLegacyThemeCss(css: string, styleSystem: 'tailwind' | 'css' = 'tailwind') {
  if (
    css.includes('tailwindcss-animate')
    || css.includes('@tailwind base')
    || css.includes('@tailwind components')
    || css.includes('@tailwind utilities')
    || (css.includes('--primary') && !css.includes('--sidebar'))
  ) {
    return true;
  }

  if (styleSystem === 'css') {
    return cssHasHslTriplets(css) || !cssDefinesSpacing(css);
  }

  return cssHasHslTriplets(css) && !css.includes('@theme');
}

export function wrapHslTriplets(css: string) {
  return css.replace(HSL_TRIPLET_PATTERN, '--$1: hsl($2 $3% $4%);');
}

function blockHasToken(block: string, token: string) {
  return new RegExp(`--${token}\\s*:`).test(block);
}

function insertMissingTokensInBlock(block: string) {
  const lines = Object.entries(MISSING_TOKEN_FALLBACKS)
    .filter(([token]) => !blockHasToken(block, token))
    .map(([token, donor]) => `    --${token}: var(--${donor});`);

  if (!lines.length) {
    return { block, added: [] as string[] };
  }

  const added = Object.keys(MISSING_TOKEN_FALLBACKS).filter(token => !blockHasToken(block, token));
  const closingBrace = block.lastIndexOf('}');

  if (closingBrace === -1) {
    return { block, added: [] as string[] };
  }

  const next = `${block.slice(0, closingBrace).replace(/\s*$/, '')}\n${lines.join('\n')}\n${block.slice(closingBrace)}`;
  return { block: next, added };
}

function patchSelectorBlocks(css: string, selectorPattern: RegExp) {
  const added = new Set<string>();

  const next = css.replace(selectorPattern, (block) => {
    const patched = insertMissingTokensInBlock(block);
    patched.added.forEach(token => added.add(token));
    return patched.block;
  });

  return { css: next, added: [...added] };
}

function themeColorLine(key: string, useHslVar: boolean) {
  return useHslVar
    ? `  --color-${key}: hsl(var(--${key}));`
    : `  --color-${key}: var(--${key});`;
}

function buildThemeInline(useHslVar: boolean) {
  return `@theme inline {\n${themeColorKeys.map(key => themeColorLine(key, useHslVar)).join('\n')}\n}\n`;
}

function ensureImport(css: string, statement: string) {
  if (css.includes(statement)) {
    return css;
  }

  const importMatch = [...css.matchAll(/@import[^;]+;/g)].at(-1);

  if (importMatch?.index !== undefined) {
    const insertAt = importMatch.index + importMatch[0].length;
    return `${css.slice(0, insertAt)}\n${statement}${css.slice(insertAt)}`;
  }

  return `${statement}\n${css}`;
}

export function migrateThemeCss(
  css: string,
  options: { styleSystem: 'tailwind' | 'css'; hasJsConfig: boolean },
): CssMigration {
  const changes: string[] = [];
  const instructions: string[] = [];
  let next = css;

  const wrapTriplets = options.styleSystem === 'css' || !options.hasJsConfig;
  const hadTriplets = cssHasHslTriplets(next);

  if (wrapTriplets && hadTriplets) {
    next = wrapHslTriplets(next);
    changes.push('HSL triplet variables -> hsl() colors so var(--token) works in 2.0 components');
  } else if (hadTriplets) {
    instructions.push('Theme variables are still HSL triplets (`--primary: 240 5.9% 10%`). Tailwind utilities get `hsl(var(--token))` via @theme. CSS that uses `var(--primary)` directly needs a full color value.');
  }

  const rootPatched = patchSelectorBlocks(next, /:root\s*\{[\s\S]*?\}/g);
  next = rootPatched.css;
  const darkPatched = patchSelectorBlocks(next, /\.dark\s*\{[\s\S]*?\}/g);
  next = darkPatched.css;

  if (rootPatched.added.length || darkPatched.added.length) {
    changes.push(`added missing theme tokens: ${[...new Set([...rootPatched.added, ...darkPatched.added])].join(', ')}`);
  }

  if (options.styleSystem === 'css' && !cssDefinesSpacing(next)) {
    next = insertSpacingToken(next);
    changes.push('added the --spacing token used by CSS style components');
  }

  if (next.includes('@tailwind base') || next.includes('@tailwind components') || next.includes('@tailwind utilities')) {
    next = next.replace(TAILWIND_DIRECTIVE_PATTERN, '');
    next = ensureImport(next, '@import "tailwindcss";');
    changes.push('@tailwind directives -> @import "tailwindcss"');
  }

  if (next.includes('tailwindcss-animate')) {
    next = next.replace(/@import\s+["']tailwindcss-animate["']\s*;\s*/g, '');
    next = next.replace(/@plugin\s+["']tailwindcss-animate["']\s*;\s*/g, '');
    changes.push('removed tailwindcss-animate');
  }

  if (options.styleSystem === 'tailwind' && !next.includes('tw-animate-css')) {
    next = ensureImport(next, '@import "tw-animate-css";');
    changes.push('added @import "tw-animate-css"');
  }

  if (options.styleSystem === 'tailwind' && !next.includes('@custom-variant dark')) {
    next = ensureImport(next, '@custom-variant dark (&:is(.dark *));');
    changes.push('added @custom-variant dark');
  }

  if (options.styleSystem === 'tailwind' && !next.includes('@theme')) {
    const useHslVar = hadTriplets && !wrapTriplets;
    const themeBlock = buildThemeInline(useHslVar);
    const importMatch = [...next.matchAll(/@import[^;]+;|@custom-variant[^;]+;/g)].at(-1);

    if (importMatch?.index !== undefined) {
      const insertAt = importMatch.index + importMatch[0].length;
      next = `${next.slice(0, insertAt)}\n\n${themeBlock}${next.slice(insertAt)}`;
    } else {
      next = `${themeBlock}\n${next}`;
    }

    changes.push(useHslVar
      ? 'added @theme inline mapping --color-* to hsl(var(--*))'
      : 'added @theme inline mapping --color-* to var(--*)');
  }

  if (options.styleSystem === 'tailwind') {
    instructions.push('SIGMA-UI 2.0 is Tailwind CSS v4 only. Remove the `tailwindcss-animate` plugin from tailwind.config.js if it is still there, and keep `@tailwindcss/vite` in your Vite/Nuxt config.');
  }

  return { css: next, changes, instructions };
}

export async function readCssFile(filePath: string) {
  if (!existsSync(filePath)) {
    return null;
  }

  return readFile(filePath, 'utf8');
}

export async function writeCssFile(filePath: string, content: string) {
  await writeFile(filePath, content, 'utf8');
}
