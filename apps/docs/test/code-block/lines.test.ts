import { describe, expect, it } from 'vitest';
import {
  findWordRanges,
  normalizeCode,
  parseLineSelector,
  prepareCode,
  resolveLineVariant,
  segmentLine,
} from '@ui/registry/shared/ui/code-block/lines';

describe('parseLineSelector', () => {
  it('reads single lines and ranges', () => {
    expect([...parseLineSelector('1,4-6')]).toEqual([1, 4, 5, 6]);
    expect([...parseLineSelector(' 3 - 2 , 8 ')]).toEqual([2, 3, 8]);
  });

  it('accepts arrays and ignores invalid entries', () => {
    expect([...parseLineSelector([2, 0, -1, 1.5, 3])]).toEqual([2, 3]);
    expect([...parseLineSelector('a,2,')]).toEqual([2]);
    expect(parseLineSelector(undefined).size).toBe(0);
  });
});

describe('normalizeCode', () => {
  it('normalizes line endings and drops one trailing newline', () => {
    expect(normalizeCode('a\r\nb\rc\n')).toBe('a\nb\nc');
    expect(normalizeCode('a\n\n')).toBe('a\n');
  });
});

describe('prepareCode', () => {
  it('keeps plain code as is', () => {
    const prepared = prepareCode('const a = 1;\n\nconst b = 2;\n');

    expect(prepared.code).toBe('const a = 1;\n\nconst b = 2;');
    expect(prepared.lines.map(line => line.sourceLine)).toEqual([1, 2, 3]);
    expect(prepared.copyText).toBe(prepared.code);
  });

  it('reads diff markers and copies the code after the change', () => {
    const prepared = prepareCode(' keep\n-old\n+new\n+++ b/file\nplain', { diff: true });

    expect(prepared.lines.map(line => [line.text, line.variant])).toEqual([
      ['keep', 'default'],
      ['old', 'removed'],
      ['new', 'added'],
      ['+++ b/file', 'default'],
      ['plain', 'default'],
    ]);
    expect(prepared.copyText).toBe('keep\nnew\n+++ b/file\nplain');
  });

  it('leaves markers alone without the diff option', () => {
    expect(prepareCode('-a\n+b').lines.map(line => line.variant)).toEqual(['default', 'default']);
  });

  it('reads notation comments and strips them', () => {
    const prepared = prepareCode([
      'const a = 1; // [!code highlight]',
      'const b = 2; // [!code focus:2]',
      'const c = 3;',
      'const d = 4; // [!code --]',
      'const e = 5; // [!code ++]',
      '<div /> <!-- [!code hl] -->',
      'x = 1 # [!code highlight] // [!code focus]',
    ].join('\n'), { notation: true });

    expect(prepared.lines.map(line => line.text)).toEqual([
      'const a = 1;',
      'const b = 2;',
      'const c = 3;',
      'const d = 4;',
      'const e = 5;',
      '<div />',
      'x = 1',
    ]);
    expect(prepared.lines.map(line => line.variant)).toEqual(['highlighted', 'default', 'default', 'removed', 'added', 'highlighted', 'highlighted']);
    expect(prepared.lines.map(line => line.focused)).toEqual([false, true, true, false, false, false, true]);
    expect(prepared.copyText).not.toContain('const d');
  });

  it('applies a word comment on its own line to the lines after it', () => {
    const prepared = prepareCode('// [!code word:theme:2]\nconst theme = 1;\ntheme++;\ntheme--;', { notation: true });

    expect(prepared.lines.map(line => line.text)).toEqual(['const theme = 1;', 'theme++;', 'theme--;']);
    expect(prepared.lines.map(line => line.words)).toEqual([['theme'], ['theme'], []]);
    expect(prepared.lines[0].sourceLine).toBe(2);
  });

  it('marks words on the line of an inline word comment', () => {
    const prepared = prepareCode('const value = 1; // [!code word:value]', { notation: true });

    expect(prepared.lines[0]).toMatchObject({ text: 'const value = 1;', words: ['value'] });
  });

  it('keeps unknown notation comments', () => {
    expect(prepareCode('a // [!code nope]', { notation: true }).lines[0].text).toBe('a // [!code nope]');
  });
});

describe('resolveLineVariant', () => {
  const line = { text: '', sourceLine: 3, variant: 'default' as const, focused: false, words: [] };

  it('counts source lines, so removed wins over added and added over highlighted', () => {
    expect(resolveLineVariant(line, { highlightLines: new Set([3]) })).toBe('highlighted');
    expect(resolveLineVariant(line, { highlightLines: new Set([3]), addedLines: new Set([3]) })).toBe('added');
    expect(resolveLineVariant(line, { addedLines: new Set([3]), removedLines: new Set([3]) })).toBe('removed');
    expect(resolveLineVariant(line, { highlightLines: new Set([1]) })).toBe('default');
  });
});

describe('findWordRanges', () => {
  it('finds strings and patterns and merges overlaps', () => {
    expect(findWordRanges('data, error, data', ['data'])).toEqual([[0, 4], [13, 17]]);
    expect(findWordRanges('useFetch(url)', [/use\w+/, 'Fetch(u'])).toEqual([[0, 10]]);
    expect(findWordRanges('aaa', ['', /x*/])).toEqual([]);
  });
});

describe('segmentLine', () => {
  it('splits tokens at range edges and keeps their style', () => {
    const tokens = [{ content: 'const ', style: { color: 'red' } }, { content: 'data', style: { color: 'blue' } }, { content: ' = 1' }];

    expect(segmentLine(tokens, [[4, 8]])).toEqual([
      { type: 'token', token: { content: 'cons', style: { color: 'red' } } },
      { type: 'mark', tokens: [{ content: 't ', style: { color: 'red' } }, { content: 'da', style: { color: 'blue' } }] },
      { type: 'token', token: { content: 'ta', style: { color: 'blue' } } },
      { type: 'token', token: { content: ' = 1' } },
    ]);
  });

  it('returns tokens unchanged without ranges', () => {
    expect(segmentLine([{ content: 'a' }], [])).toEqual([{ type: 'token', token: { content: 'a' } }]);
  });
});
