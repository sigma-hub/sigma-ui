import { describe, expect, it } from 'vitest';
import {
  BLOCK_RENDERER_PATH,
  buildBlockFrameSrc,
  buildExampleFrameSrc,
  canExtendRollupInput,
  DEMO_FRAME_MIN_HEIGHT,
  FRAME_HEIGHT_MESSAGE,
  isFrameHeightMessage,
  FRAME_OVERFLOW_MESSAGE,
  isFrameOverflowMessage,
  MAX_FRAME_EXTRA_HEIGHT,
  isBlockRendererRequest,
  parseBlockFrameHash,
  parseStoredJson,
  readPreviewConfig,
  resolvePreviewAppearance,
  resolveDemoFrameHeight,
  resolveFrameExtraHeight,
  resolvePreviewDark,
  stripThemeChunkPreload,
  stripThemeChunkSideEffect,
} from './frame';

describe('block frame hash', () => {
  it('round-trips the iframe hash params', () => {
    const params = {
      name: 'mail-inbox',
      styleSystem: 'tailwind',
      containerClass: 'w-full h-full p-4 lg:p-0',
    };

    expect(parseBlockFrameHash(buildBlockFrameSrc(params).split('#')[1] ?? '')).toEqual({
      ...params,
      kind: 'block',
      className: '',
      align: 'center',
    });
    expect(buildBlockFrameSrc(params).startsWith(`${BLOCK_RENDERER_PATH}#`)).toBe(true);
  });

  it('points component previews at the block renderer entry', () => {
    const src = buildExampleFrameSrc({
      name: 'Button',
      styleSystem: 'css',
      className: 'max-w-xs',
      align: 'start',
    });

    expect(src.startsWith(`${BLOCK_RENDERER_PATH}#`)).toBe(true);
    expect(parseBlockFrameHash(src.split('#')[1] ?? '')).toEqual({
      name: 'Button',
      styleSystem: 'css',
      containerClass: '',
      kind: 'example',
      className: 'max-w-xs',
      align: 'start',
    });
  });

  it('treats a missing hash as an empty preview', () => {
    expect(parseBlockFrameHash('')).toEqual({
      name: '',
      styleSystem: '',
      containerClass: '',
      kind: 'block',
      className: '',
      align: 'center',
    });
  });
});

describe('block renderer request paths', () => {
  it('accepts the directory and index urls', () => {
    expect(isBlockRendererRequest('/block-renderer')).toBe(true);
    expect(isBlockRendererRequest('/block-renderer/')).toBe(true);
    expect(isBlockRendererRequest(BLOCK_RENDERER_PATH)).toBe(true);
    expect(isBlockRendererRequest('/blocks/renderer')).toBe(false);
  });
});

describe('docs preview appearance', () => {
  it('reads a raw vitepress appearance string and quoted json', () => {
    expect(resolvePreviewAppearance(parseStoredJson('dark'))).toBe('dark');
    expect(resolvePreviewAppearance(parseStoredJson('"dark"'))).toBe('dark');
    expect(resolvePreviewAppearance(parseStoredJson('null'))).toBe('auto');
    expect(resolvePreviewAppearance(parseStoredJson('not-json'))).toBe('auto');
    expect(resolvePreviewDark('auto', true)).toBe(true);
    expect(resolvePreviewDark('light', true)).toBe(false);
    expect(resolvePreviewDark('dark', false)).toBe(true);
  });

  it('fills missing theme settings from the docs defaults', () => {
    expect(readPreviewConfig(parseStoredJson('{"theme":"blue","radius":1}'))).toEqual({
      theme: 'blue',
      radius: 1,
      backdropFilterBlur: 32,
    });
    expect(readPreviewConfig(undefined).theme).toBe('grayscale');
  });
});

describe('theme chunk side effect', () => {
  it('drops the docs theme import and preload from the block entry', () => {
    const code = 'import{a}from"./chunks/framework.js";import"./chunks/theme.abc123.js";const ready = true;';
    const html = '<link rel="modulepreload" crossorigin href="/assets/chunks/theme.abc123.js">\n<script type="module" src="/assets/block-renderer.js"></script>';

    expect(stripThemeChunkSideEffect(code)).toBe('import{a}from"./chunks/framework.js";const ready = true;');
    expect(stripThemeChunkPreload(html)).not.toContain('theme.abc123.js');
    expect(stripThemeChunkPreload(html)).toContain('block-renderer.js');
  });
});

describe('block renderer rollup input', () => {
  it('extends an object input and leaves other input shapes alone', () => {
    expect(canExtendRollupInput({ app: '/app.js' })).toBe(true);
    expect(canExtendRollupInput(['/app.js'])).toBe(false);
    expect(canExtendRollupInput('/app.js')).toBe(false);
  });
});

describe('frame overflow', () => {
  const message = (open: boolean, requiredHeight: number) => ({ type: FRAME_OVERFLOW_MESSAGE, open, requiredHeight } as const);

  it('accepts only well-formed overflow messages', () => {
    expect(isFrameOverflowMessage(message(true, 420))).toBe(true);
    expect(isFrameOverflowMessage({ type: FRAME_OVERFLOW_MESSAGE, open: true, requiredHeight: Number.NaN })).toBe(false);
    expect(isFrameOverflowMessage({ type: 'other', open: true, requiredHeight: 1 })).toBe(false);
    expect(isFrameOverflowMessage(null)).toBe(false);
  });

  it('grows to the required height while open and resets on close', () => {
    expect(resolveFrameExtraHeight(0, message(true, 389.2), 350)).toBe(40);
    expect(resolveFrameExtraHeight(40, message(true, 389.2), 350)).toBe(40);
    expect(resolveFrameExtraHeight(40, message(true, 300), 350)).toBe(40);
    expect(resolveFrameExtraHeight(40, message(false, 0), 350)).toBe(0);
  });

  it('caps the extra height', () => {
    expect(resolveFrameExtraHeight(0, message(true, 10_000), 350)).toBe(MAX_FRAME_EXTRA_HEIGHT);
  });
});

describe('demo frame height', () => {
  it('grows the frame to a taller demo', () => {
    expect(resolveDemoFrameHeight(1866.4)).toBe(1867);
  });

  it('keeps the default height for a shorter demo', () => {
    expect(resolveDemoFrameHeight(420)).toBe(DEMO_FRAME_MIN_HEIGHT);
  });

  it('accepts only finite height messages', () => {
    expect(isFrameHeightMessage({ type: FRAME_HEIGHT_MESSAGE, height: 1200 })).toBe(true);
    expect(isFrameHeightMessage({ type: FRAME_HEIGHT_MESSAGE, height: Number.NaN })).toBe(false);
    expect(isFrameHeightMessage({ type: 'other', height: 1200 })).toBe(false);
    expect(isFrameHeightMessage(null)).toBe(false);
  });
});
