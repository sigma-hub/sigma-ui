export const BLOCK_RENDERER_PATH = '/block-renderer/index.html';
export const DOCS_APPEARANCE_KEY = 'vitepress-theme-appearance';
export const DOCS_CONFIG_KEY = 'config';
export const FRAME_OVERFLOW_MESSAGE = 'sigma-ui:frame-overflow';
export const MAX_FRAME_EXTRA_HEIGHT = 720;
export const FRAME_HEIGHT_MESSAGE = 'sigma-ui:frame-height';
export const DEMO_FRAME_MIN_HEIGHT = 900;

export interface FrameHeightMessage {
  type: typeof FRAME_HEIGHT_MESSAGE;
  height: number;
}

export interface FrameOverflowMessage {
  type: typeof FRAME_OVERFLOW_MESSAGE;
  open: boolean;
  requiredHeight: number;
}

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

export type BlockFrameSrcParams = Pick<BlockFrameParams, 'name' | 'styleSystem' | 'containerClass'>;

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

export function buildBlockFrameSrc(params: BlockFrameSrcParams) {
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
    return raw;
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

export function isFrameOverflowMessage(value: unknown): value is FrameOverflowMessage {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const message = value as Partial<FrameOverflowMessage>;

  return message.type === FRAME_OVERFLOW_MESSAGE
    && typeof message.open === 'boolean'
    && typeof message.requiredHeight === 'number'
    && Number.isFinite(message.requiredHeight);
}

export function isFrameHeightMessage(value: unknown): value is FrameHeightMessage {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const message = value as Partial<FrameHeightMessage>;

  return message.type === FRAME_HEIGHT_MESSAGE
    && typeof message.height === 'number'
    && Number.isFinite(message.height);
}

/**
 * Height of a homepage demo frame that grows with its content. It never drops
 * below the default demo height, so short demos keep the same frame as the
 * full-app ones and switching tabs does not move the content under them.
 */
export function resolveDemoFrameHeight(contentHeight: number, minHeight = DEMO_FRAME_MIN_HEIGHT) {
  return Math.max(minHeight, Math.ceil(contentHeight));
}

/**
 * Extra iframe height for an example whose floating content (a menu, list, or
 * popover) does not fit. The frame keeps the example where it is and the new
 * room appears below it, so the trigger never moves away from the pointer.
 * The height only grows while something is open and resets once everything
 * closes, so it never oscillates.
 */
export function resolveFrameExtraHeight(current: number, message: FrameOverflowMessage, baseHeight: number) {
  if (!message.open) {
    return 0;
  }

  const needed = Math.ceil(message.requiredHeight) - baseHeight;

  return Math.min(MAX_FRAME_EXTRA_HEIGHT, Math.max(current, needed));
}
