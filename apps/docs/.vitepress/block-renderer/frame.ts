export const BLOCK_RENDERER_PATH = '/block-renderer/index.html';
export const DOCS_APPEARANCE_KEY = 'vitepress-theme-appearance';
export const DOCS_CONFIG_KEY = 'config';

const DEFAULT_THEME = 'grayscale';
const DEFAULT_RADIUS = 0.5;
const DEFAULT_BACKDROP_FILTER_BLUR = 32;

export interface BlockFrameParams {
  name: string;
  styleSystem: string;
  containerClass: string;
  kind: 'block' | 'example' | 'demo';
  className: string;
  align: 'center' | 'start' | 'end';
}

export interface ExampleFrameParams {
  name: string;
  styleSystem: string;
  className?: string;
  align?: BlockFrameParams['align'];
}

export interface PreviewConfig {
  theme: string;
  radius: number;
  backdropFilterBlur: number;
}

export type PreviewAppearance = 'dark' | 'light' | 'auto';

export function isBlockRendererRequest(pathname: string) {
  return pathname === '/block-renderer'
    || pathname === '/block-renderer/'
    || pathname === BLOCK_RENDERER_PATH;
}

export function buildBlockFrameSrc(params: BlockFrameParams) {
  const hash = new URLSearchParams({
    name: params.name,
    styleSystem: params.styleSystem,
    containerClass: params.containerClass,
  });

  return `${BLOCK_RENDERER_PATH}#${hash.toString()}`;
}

export function buildDemoFrameSrc(name: string) {
  const hash = new URLSearchParams({
    name,
    kind: 'demo',
  });

  return `${BLOCK_RENDERER_PATH}#${hash.toString()}`;
}

export function buildExampleFrameSrc(params: ExampleFrameParams) {
  const hash = new URLSearchParams({
    name: params.name,
    styleSystem: params.styleSystem,
    kind: 'example',
    align: params.align ?? 'center',
  });

  if (params.className) {
    hash.set('className', params.className);
  }

  return `${BLOCK_RENDERER_PATH}#${hash.toString()}`;
}

export function parseBlockFrameHash(hash: string): BlockFrameParams {
  const query = hash.startsWith('#') ? hash.slice(1) : hash;
  const params = new URLSearchParams(query);
  const align = params.get('align');
  const kind = params.get('kind');

  return {
    name: params.get('name') ?? '',
    styleSystem: params.get('styleSystem') ?? '',
    containerClass: params.get('containerClass') ?? '',
    kind: kind === 'example' || kind === 'demo' ? kind : 'block',
    className: params.get('className') ?? '',
    align: align === 'start' || align === 'end' ? align : 'center',
  };
}

export function parseStoredJson(raw: string | null): unknown {
  if (!raw) {
    return undefined;
  }

  try {
    return JSON.parse(raw) as unknown;
  } catch {
    return undefined;
  }
}

export function resolvePreviewAppearance(value: unknown): PreviewAppearance {
  if (value === 'dark' || value === 'light' || value === 'auto') {
    return value;
  }

  return 'auto';
}

export function resolvePreviewDark(appearance: PreviewAppearance, prefersDark: boolean) {
  switch (appearance) {
    case 'dark':
      return true;
    case 'light':
      return false;
    case 'auto':
      return prefersDark;

    default: {
      const unreachable: never = appearance;

      return unreachable;
    }
  }
}

export function readPreviewConfig(value: unknown): PreviewConfig {
  const stored = isRecord(value) ? value : {};

  return {
    theme: typeof stored.theme === 'string' && stored.theme.length > 0 ? stored.theme : DEFAULT_THEME,
    radius: typeof stored.radius === 'number' ? stored.radius : DEFAULT_RADIUS,
    backdropFilterBlur: typeof stored.backdropFilterBlur === 'number'
      ? stored.backdropFilterBlur
      : DEFAULT_BACKDROP_FILTER_BLUR,
  };
}

export function stripThemeChunkSideEffect(code: string) {
  return code.replace(/import\s*["']\.\/chunks\/theme\.[^"']+\.js["'];?/g, '');
}

export function stripThemeChunkPreload(html: string) {
  return html.replace(/<link rel="modulepreload"[^>]*href="\/assets\/chunks\/theme\.[^"]+\.js">\s*/g, '');
}

export function canExtendRollupInput(input: unknown): input is Record<string, unknown> {
  return isRecord(input);
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
