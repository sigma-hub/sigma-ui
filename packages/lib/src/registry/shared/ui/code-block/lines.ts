export type CodeBlockLineVariant = 'default' | 'added' | 'removed' | 'highlighted';

/** A set of 1-based line numbers: `"1,4-6"` or `[1, 4, 5, 6]`. */
export type LineSelector = string | number[];

/** A word, phrase, or pattern to mark inside the code. */
export type WordMatcher = string | RegExp;

export interface PrepareCodeOptions {
  /** Treat a leading `+`, `-`, or space on each line as a diff marker. */
  diff?: boolean;
  /** Read and strip `[!code highlight|focus|++|--|word:…]` comments. */
  notation?: boolean;
}

export interface PreparedLine {
  /** Line text without diff markers or notation comments. */
  text: string;
  /** 1-based line number in the code that was passed in. */
  sourceLine: number;
  /** State set by a diff marker or a notation comment. */
  variant: CodeBlockLineVariant;
  /** Whether a `[!code focus]` comment marked the line. */
  focused: boolean;
  /** Words that a `[!code word:…]` comment marked on this line. */
  words: string[];
}

export interface PreparedCode {
  /** The code to display and highlight, one entry per rendered line. */
  lines: PreparedLine[];
  /** The rendered text, joined with newlines. Pass this to the highlighter. */
  code: string;
  /** The text to copy: rendered text without removed lines. */
  copyText: string;
}

/** Normalizes line endings and drops one trailing newline. */
export function normalizeCode(code: string): string {
  const normalized = code.replace(/\r\n?/g, '\n');
  return normalized.endsWith('\n') ? normalized.slice(0, -1) : normalized;
}

export function splitLines(code: string): string[] {
  return normalizeCode(code).split('\n');
}

/** Parses `"1,4-6"` or a number array into a set of positive line numbers. */
export function parseLineSelector(selector: LineSelector | undefined | null): Set<number> {
  const lines = new Set<number>();

  if (!selector) {
    return lines;
  }

  if (Array.isArray(selector)) {
    selector.filter(line => Number.isInteger(line) && line > 0).forEach(line => lines.add(line));
    return lines;
  }

  for (const part of selector.split(',')) {
    const match = part.trim().match(/^(\d+)(?:\s*-\s*(\d+))?$/);

    if (!match) {
      continue;
    }

    const first = Number(match[1]);
    const last = match[2] === undefined ? first : Number(match[2]);
    const [start, end] = first <= last ? [first, last] : [last, first];

    for (let line = Math.max(start, 1); line <= end; line++) {
      lines.add(line);
    }
  }

  return lines;
}

const NOTATION_PATTERN = /\s*(?:\/\/|#|--|<!--|\/\*|\{\/\*|;)\s*\[!code ([^\]]+)\]\s*(?:-->|\*\/\}?)?\s*$/;

interface Notation {
  kind: 'highlight' | 'focus' | 'added' | 'removed' | 'word';
  count: number;
  word?: string;
}

function parseNotation(value: string): Notation | null {
  const [name, ...rest] = value.trim().split(':');
  const argument = rest.join(':');
  const count = /^\d+$/.test(argument) ? Number(argument) : 1;

  switch (name) {
    case 'highlight':
    case 'hl':
      return { kind: 'highlight', count };
    case 'focus':
      return { kind: 'focus', count };
    case '++':
      return { kind: 'added', count };
    case '--':
      return { kind: 'removed', count };

    case 'word': {
      const separator = argument.lastIndexOf(':');
      const hasCount = separator > 0 && /^\d+$/.test(argument.slice(separator + 1));

      return {
        kind: 'word',
        word: hasCount ? argument.slice(0, separator) : argument,
        count: hasCount ? Number(argument.slice(separator + 1)) : Number.POSITIVE_INFINITY,
      };
    }

    default:
      return null;
  }
}

function readDiffMarker(text: string): { text: string; variant: CodeBlockLineVariant } {
  if (/^(\+\+\+|---)( |$)/.test(text)) {
    return { text, variant: 'default' };
  }

  if (text.startsWith('+')) {
    return { text: text.slice(1), variant: 'added' };
  }

  if (text.startsWith('-')) {
    return { text: text.slice(1), variant: 'removed' };
  }

  return { text: text.startsWith(' ') ? text.slice(1) : text, variant: 'default' };
}

/**
 * Splits code into rendered lines, reading diff markers and notation comments.
 * The component and `useHighlightedCode` both call it, so their lines match.
 */
export function prepareCode(code: string, options: PrepareCodeOptions = {}): PreparedCode {
  const lines: PreparedLine[] = [];
  const pendingWords: { word: string; remaining: number }[] = [];
  const pending: { kind: Exclude<Notation['kind'], 'word'>; remaining: number }[] = [];

  splitLines(code).forEach((raw, index) => {
    let text = raw;
    let variant: CodeBlockLineVariant = 'default';
    let focused = false;
    const notations: Notation[] = [];

    if (options.diff) {
      ({ text, variant } = readDiffMarker(text));
    }

    if (options.notation) {
      let match = text.match(NOTATION_PATTERN);

      while (match) {
        const notation = parseNotation(match[1]);

        if (!notation) {
          break;
        }

        notations.unshift(notation);
        text = text.slice(0, match.index);
        match = text.match(NOTATION_PATTERN);
      }

      // A comment on its own line only marks words for the lines after it.
      if (notations.length > 0 && text.trim() === '' && notations.every(notation => notation.kind === 'word')) {
        notations.forEach(notation => pendingWords.push({ word: notation.word ?? '', remaining: notation.count }));
        return;
      }
    }

    const words: string[] = [];

    for (const entry of pendingWords) {
      if (entry.remaining > 0 && entry.word) {
        words.push(entry.word);
        entry.remaining--;
      }
    }

    for (const notation of notations) {
      if (notation.kind === 'word') {
        if (notation.word) {
          words.push(notation.word);
          pendingWords.push({ word: notation.word, remaining: notation.count - 1 });
        }

        continue;
      }

      pending.push({ kind: notation.kind, remaining: notation.count });
    }

    for (const entry of pending) {
      if (entry.remaining <= 0) {
        continue;
      }

      entry.remaining--;

      if (entry.kind === 'focus') {
        focused = true;
      } else if (entry.kind === 'highlight') {
        variant = variant === 'default' ? 'highlighted' : variant;
      } else {
        variant = entry.kind;
      }
    }

    lines.push({ text, sourceLine: index + 1, variant, focused, words });
  });

  return {
    lines,
    code: lines.map(line => line.text).join('\n'),
    copyText: lines.filter(line => line.variant !== 'removed').map(line => line.text).join('\n'),
  };
}

export interface ResolveVariantOptions {
  highlightLines?: Set<number>;
  addedLines?: Set<number>;
  removedLines?: Set<number>;
}

/** Applies line selectors on top of the variant read from the code. Removed wins over added, added over highlighted. */
export function resolveLineVariant(line: PreparedLine, options: ResolveVariantOptions): CodeBlockLineVariant {
  if (line.variant === 'removed' || options.removedLines?.has(line.sourceLine)) {
    return 'removed';
  }

  if (line.variant === 'added' || options.addedLines?.has(line.sourceLine)) {
    return 'added';
  }

  if (line.variant === 'highlighted' || options.highlightLines?.has(line.sourceLine)) {
    return 'highlighted';
  }

  return 'default';
}

/** Returns sorted, merged `[start, end)` ranges of every match in the text. */
export function findWordRanges(text: string, matchers: readonly WordMatcher[]): [number, number][] {
  const ranges: [number, number][] = [];

  for (const matcher of matchers) {
    if (typeof matcher === 'string') {
      if (!matcher) {
        continue;
      }

      let index = text.indexOf(matcher);

      while (index !== -1) {
        ranges.push([index, index + matcher.length]);
        index = text.indexOf(matcher, index + matcher.length);
      }

      continue;
    }

    const pattern = new RegExp(matcher.source, matcher.flags.includes('g') ? matcher.flags : `${matcher.flags}g`);

    for (const match of text.matchAll(pattern)) {
      if (match[0].length > 0 && match.index !== undefined) {
        ranges.push([match.index, match.index + match[0].length]);
      }
    }
  }

  ranges.sort((first, second) => first[0] - second[0] || second[1] - first[1]);

  const merged: [number, number][] = [];

  for (const range of ranges) {
    const last = merged.at(-1);

    if (last && range[0] <= last[1]) {
      last[1] = Math.max(last[1], range[1]);
    } else {
      merged.push([...range]);
    }
  }

  return merged;
}

export interface CodeToken {
  content: string;
  style?: Record<string, string>;
}

export type CodeLineSegment =
  | { type: 'token'; token: CodeToken }
  | { type: 'mark'; tokens: CodeToken[] };

/** Groups the tokens of one line into plain tokens and marked runs, splitting tokens at range edges. */
export function segmentLine(tokens: readonly CodeToken[], ranges: readonly [number, number][]): CodeLineSegment[] {
  if (ranges.length === 0) {
    return tokens.map(token => ({ type: 'token', token }));
  }

  const segments: CodeLineSegment[] = [];
  let lineOffset = 0;
  let rangeIndex = 0;
  let openRange = -1;

  for (const token of tokens) {
    let position = 0;

    while (position < token.content.length) {
      const absolute = lineOffset + position;

      while (rangeIndex < ranges.length && ranges[rangeIndex][1] <= absolute) {
        rangeIndex++;
      }

      const range = ranges[rangeIndex];
      const inRange = range !== undefined && range[0] <= absolute;
      const boundary = range === undefined ? Number.POSITIVE_INFINITY : (inRange ? range[1] : range[0]) - lineOffset;
      const end = Math.min(token.content.length, boundary);
      const piece: CodeToken = { ...token, content: token.content.slice(position, end) };
      const last = segments.at(-1);

      if (!inRange) {
        segments.push({ type: 'token', token: piece });
        openRange = -1;
      } else if (last?.type === 'mark' && openRange === rangeIndex) {
        last.tokens.push(piece);
      } else {
        segments.push({ type: 'mark', tokens: [piece] });
        openRange = rangeIndex;
      }

      position = end;
    }

    lineOffset += token.content.length;
  }

  return segments;
}
