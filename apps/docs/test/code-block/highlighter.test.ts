import { describe, expect, it } from 'vitest';
import {
  codeBlockLanguageAliases,
  codeBlockLanguages,
  highlightCode,
  loadCodeBlockHighlighter,
  resolveCodeBlockLanguage,
} from '@ui/registry/shared/ui/code-block/highlighter';

describe('resolveCodeBlockLanguage', () => {
  it('resolves names and aliases', () => {
    expect(resolveCodeBlockLanguage('typescript')).toBe('typescript');
    expect(resolveCodeBlockLanguage('ts')).toBe('typescript');
    expect(resolveCodeBlockLanguage('sh')).toBe('bash');
    expect(resolveCodeBlockLanguage('ansi')).toBe('ansi');
  });

  it('returns null for languages that are not listed', () => {
    expect(resolveCodeBlockLanguage('cobol')).toBeNull();
    expect(resolveCodeBlockLanguage(undefined)).toBeNull();
  });

  it('only aliases listed languages', () => {
    for (const target of Object.values(codeBlockLanguageAliases)) {
      expect(codeBlockLanguages).toHaveProperty(target);
    }
  });
});

describe('highlightCode', () => {
  it('colors tokens with the --code-block-* variables', async () => {
    const lines = await highlightCode('const answer = 42; // done', 'ts');

    expect(lines).toHaveLength(1);
    expect(lines![0].map(token => token.content).join('')).toBe('const answer = 42; // done');

    const colors = new Set(lines![0].map(token => token.style?.color));
    expect([...colors].every(color => /^var\(--code-block-[a-z-]+\)$/.test(color ?? ''))).toBe(true);
    expect(colors).toContain('var(--code-block-token-keyword)');
    expect(colors).toContain('var(--code-block-token-comment)');
  });

  it('returns null for an unknown language', async () => {
    await expect(highlightCode('x', 'cobol')).resolves.toBeNull();
  });

  it('returns plain JSON that survives serialization', async () => {
    const lines = await highlightCode('<template>\n  <div />\n</template>', 'vue');

    expect(lines).toHaveLength(3);
    expect(JSON.parse(JSON.stringify(lines))).toEqual(lines);
  });

  it('carries both colors for a pair of themes', async () => {
    const lines = await highlightCode('const a = 1;', 'js', {
      themes: {
        light: () => import('shiki/themes/github-light.mjs'),
        dark: () => import('shiki/themes/github-dark.mjs'),
      },
    });

    const keyword = lines![0].find(token => token.content === 'const');
    expect(keyword?.style?.['--shiki-light']).toMatch(/^#/);
    expect(keyword?.style?.['--shiki-dark']).toMatch(/^#/);
    expect(keyword?.style?.color).toBeUndefined();
  });

  it('maps ANSI escapes to the ansi variables, line by line', async () => {
    const lines = await highlightCode('\u001B[32mok\u001B[0m\n\u001B[31mfail\u001B[0m', 'ansi');

    expect(lines!.map(line => line.map(token => token.content).join(''))).toEqual(['ok', 'fail']);
    expect(lines![0][0].style?.color).toBe('var(--code-block-ansi-green)');
    expect(lines![1][0].style?.color).toBe('var(--code-block-ansi-red)');
  });
});

describe('loadCodeBlockHighlighter', () => {
  it('reuses one instance per language and theme pair', async () => {
    const first = await loadCodeBlockHighlighter('ts');
    const second = await loadCodeBlockHighlighter('typescript');

    expect(first).not.toBeNull();
    expect(first).toBe(second);
  });

  it('gives the same tokens when highlighting in steps with the grammar state', async () => {
    const highlighter = (await loadCodeBlockHighlighter('ts'))!;
    const head = 'const text = `line one';
    const rest = 'line two`;\nconst done = true;';
    const full = highlighter.highlight(`${head}\n${rest}`).lines;
    const first = highlighter.highlight(head);
    const second = highlighter.highlight(rest, first.state);

    expect([...first.lines, ...second.lines]).toEqual(full);
  });
});
