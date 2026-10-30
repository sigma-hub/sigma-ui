import { describe, expect, it } from 'vitest';
import { highlightLines, languageForFile } from './highlight';

describe('languageForFile', () => {
  it('maps file extensions to the lazily loaded grammars', () => {
    expect(languageForFile('components/Card.vue')).toBe('vue');
    expect(languageForFile('styles/main.css')).toBe('css');
    expect(languageForFile('lib/utils.ts')).toBe('typescript');
  });
});

describe('highlightLines', () => {
  it('returns one token list per line with light and dark colour variables', async () => {
    const lines = await highlightLines('const answer = 42;\nconsole.log(answer);', 'typescript');

    expect(lines).toHaveLength(2);

    const tokens = lines.flat();

    const styles = tokens.map(token => token.htmlStyle as Record<string, string>);

    expect(styles.every(style => '--shiki-light' in style && '--shiki-dark' in style)).toBe(true);
    expect(tokens.every(token => token.color === undefined)).toBe(true);
    expect(new Set(styles.map(style => style['--shiki-light'])).size).toBeGreaterThan(2);
  });

  it('highlights vue single file components with their template, script and style blocks', async () => {
    const code = '<script setup lang="ts">\nconst count = ref(0);\n</script>\n\n<template>\n  <button @click="count++">{{ count }}</button>\n</template>\n\n<style scoped>\n.a { color: red; }\n</style>';
    const lines = await highlightLines(code, 'vue');

    expect(lines).toHaveLength(code.split('\n').length);
    expect(lines.flat().map(token => token.content).join('')).toContain('count++');
  });

  it('keeps the original text so copying matches the source', async () => {
    const code = 'a {\n  color: red;\n}\n';
    const lines = await highlightLines(code, 'css');

    expect(lines.map(line => line.map(token => token.content).join('')).join('\n')).toBe(code);
  });
});
