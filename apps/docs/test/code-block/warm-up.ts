import { highlightCode } from '@ui/registry/shared/ui/code-block/highlighter';

export const HIGHLIGHTER_WARM_UP_TIMEOUT = 30_000;

const SAMPLES: Record<string, string> = {
  ts: 'const text = `line one\nline two`;\nconst answer: number = 42; // done',
  js: 'const a = 1;',
  vue: '<script setup lang="ts">\nconst a = 1;\n</script>\n\n<template>\n  <div />\n</template>',
  ansi: '\u001B[32mok\u001B[0m',
};

/**
 * Loads Shiki and tokenizes each grammar once before the assertions run. The first tokenize of a grammar
 * compiles its regexes, which on a cold CI runner can pass Shiki's 500 ms per-line `tokenizeTimeLimit`
 * (the rest of the line then comes back as one uncolored token) or a 1 s `vi.waitFor`.
 */
export async function warmUpHighlighter(languages = Object.keys(SAMPLES)) {
  for (const language of languages) {
    await highlightCode(SAMPLES[language] ?? 'x', language);
  }
}
