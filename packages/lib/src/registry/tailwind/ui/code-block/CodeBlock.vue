<script setup lang="ts">
import { type Ref, ref, useAttrs } from 'vue';
import { useVModel } from '@vueuse/core';
import { provideCodeBlockContext } from '@ui/registry/shared/ui/code-block/code-block-state';
import { type CodeBlockVariants, codeBlockVariants } from '.';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(defineProps<{
  /** Tone of the block. `destructive` is for errors and failed output. */
  variant?: CodeBlockVariants['variant'];
  /** `sm` has tighter padding and smaller text, for tool output and logs. */
  size?: CodeBlockVariants['size'];
  /** Whether long lines wrap instead of scrolling. Use with `v-model:wrap`. */
  wrap?: boolean;
  /** Whether a block with `collapsedHeight` shows all lines. Use with `v-model:expanded`. */
  expanded?: boolean;
}>(), {
  variant: 'default',
  size: 'default',
  wrap: undefined,
  expanded: undefined,
});

const emits = defineEmits<{
  /** Emitted when the wrap button toggles wrapping. */
  'update:wrap': [value: boolean];
  /** Emitted when the expand button shows or hides lines. */
  'update:expanded': [value: boolean];
}>();

defineSlots<{
  /** Header, content, and footer parts. */
  default?: () => unknown;
}>();

const wrap = useVModel(props, 'wrap', emits, { passive: true, defaultValue: false }) as Ref<boolean>;
const expanded = useVModel(props, 'expanded', emits, { passive: true, defaultValue: false }) as Ref<boolean>;

provideCodeBlockContext({
  wrap,
  expanded,
  copyValue: ref(),
  collapsible: ref(false),
  contentId: ref(),
  titleId: ref(),
  setWrap: (value) => {
    wrap.value = value;
  },
  setExpanded: (value) => {
    expanded.value = value;
  },
});
</script>

<template>
  <div
    v-bind="delegatedAttrs()"
    data-slot="code-block"
    :data-variant="props.variant"
    :data-size="props.size"
    :data-wrap="wrap || undefined"
    :data-expanded="expanded || undefined"
    :class="cn(codeBlockVariants({ variant: props.variant, size: props.size }), $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>

<style>
[data-slot='code-block'] {
  --code-block-background: color-mix(in oklch, var(--muted) 40%, var(--background));
  --code-block-foreground: var(--foreground);
  --code-block-header: color-mix(in oklch, var(--muted) 75%, var(--background));
  --code-block-border: var(--border);
  --code-block-line-number: color-mix(in oklch, var(--muted-foreground) 85%, var(--foreground));
  --code-block-token-comment: color-mix(in oklch, var(--muted-foreground) 85%, var(--foreground));
  --code-block-token-keyword: color-mix(in oklch, oklch(50% 0.22 300deg) 85%, var(--foreground));
  --code-block-token-string: color-mix(in oklch, oklch(50% 0.14 155deg) 85%, var(--foreground));
  --code-block-token-string-expression: var(--code-block-token-string);
  --code-block-token-constant: color-mix(in oklch, oklch(53% 0.15 55deg) 85%, var(--foreground));
  --code-block-token-function: color-mix(in oklch, oklch(50% 0.18 255deg) 85%, var(--foreground));
  --code-block-token-parameter: color-mix(in oklch, oklch(52% 0.17 20deg) 85%, var(--foreground));
  --code-block-token-punctuation: color-mix(in oklch, var(--foreground) 70%, var(--muted-foreground));
  --code-block-token-link: color-mix(in oklch, var(--primary) 45%, var(--foreground));
  --code-block-ansi-black: var(--foreground);
  --code-block-ansi-red: color-mix(in oklch, oklch(52% 0.19 25deg) 85%, var(--foreground));
  --code-block-ansi-green: color-mix(in oklch, oklch(50% 0.14 150deg) 85%, var(--foreground));
  --code-block-ansi-yellow: color-mix(in oklch, oklch(53% 0.12 80deg) 85%, var(--foreground));
  --code-block-ansi-blue: color-mix(in oklch, oklch(50% 0.18 255deg) 85%, var(--foreground));
  --code-block-ansi-magenta: color-mix(in oklch, oklch(50% 0.2 320deg) 85%, var(--foreground));
  --code-block-ansi-cyan: color-mix(in oklch, oklch(50% 0.1 210deg) 85%, var(--foreground));
  --code-block-ansi-white: var(--code-block-line-number);
  --code-block-ansi-bright-black: var(--code-block-line-number);
  --code-block-ansi-bright-red: var(--code-block-ansi-red);
  --code-block-ansi-bright-green: var(--code-block-ansi-green);
  --code-block-ansi-bright-yellow: var(--code-block-ansi-yellow);
  --code-block-ansi-bright-blue: var(--code-block-ansi-blue);
  --code-block-ansi-bright-magenta: var(--code-block-ansi-magenta);
  --code-block-ansi-bright-cyan: var(--code-block-ansi-cyan);
  --code-block-ansi-bright-white: var(--code-block-line-number);
  --code-block-highlighted: color-mix(in oklch, var(--foreground) 6%, transparent);
  --code-block-highlighted-border: color-mix(in oklch, var(--foreground) 45%, transparent);
  --code-block-added: color-mix(in oklch, oklch(72% 0.17 150deg) 16%, transparent);
  --code-block-added-border: oklch(62% 0.16 150deg);
  --code-block-added-marker: color-mix(in oklch, oklch(48% 0.14 150deg) 90%, var(--foreground));
  --code-block-removed: color-mix(in oklch, oklch(70% 0.18 25deg) 15%, transparent);
  --code-block-removed-border: oklch(62% 0.2 25deg);
  --code-block-removed-marker: color-mix(in oklch, oklch(50% 0.19 25deg) 90%, var(--foreground));
  --code-block-word: color-mix(in oklch, var(--foreground) 9%, transparent);
  --code-block-word-border: color-mix(in oklch, var(--foreground) 22%, transparent);
  --code-block-destructive-foreground: color-mix(in oklch, var(--destructive) 80%, var(--foreground));
}

.dark [data-slot='code-block'] {
  --code-block-background: color-mix(in oklch, var(--muted) 30%, var(--background));
  --code-block-header: color-mix(in oklch, var(--muted) 55%, var(--background));
  --code-block-token-keyword: color-mix(in oklch, oklch(78% 0.14 300deg) 85%, var(--foreground));
  --code-block-token-string: color-mix(in oklch, oklch(80% 0.13 155deg) 85%, var(--foreground));
  --code-block-token-constant: color-mix(in oklch, oklch(80% 0.12 60deg) 85%, var(--foreground));
  --code-block-token-function: color-mix(in oklch, oklch(78% 0.12 250deg) 85%, var(--foreground));
  --code-block-token-parameter: color-mix(in oklch, oklch(80% 0.1 30deg) 85%, var(--foreground));
  --code-block-ansi-black: var(--code-block-line-number);
  --code-block-ansi-red: color-mix(in oklch, oklch(74% 0.15 25deg) 85%, var(--foreground));
  --code-block-ansi-green: color-mix(in oklch, oklch(78% 0.15 150deg) 85%, var(--foreground));
  --code-block-ansi-yellow: color-mix(in oklch, oklch(85% 0.13 90deg) 85%, var(--foreground));
  --code-block-ansi-blue: color-mix(in oklch, oklch(76% 0.12 250deg) 85%, var(--foreground));
  --code-block-ansi-magenta: color-mix(in oklch, oklch(76% 0.14 320deg) 85%, var(--foreground));
  --code-block-ansi-cyan: color-mix(in oklch, oklch(80% 0.1 210deg) 85%, var(--foreground));
  --code-block-ansi-white: var(--foreground);
  --code-block-ansi-bright-white: var(--foreground);
  --code-block-highlighted: color-mix(in oklch, var(--foreground) 8%, transparent);
  --code-block-added: color-mix(in oklch, oklch(65% 0.17 150deg) 18%, transparent);
  --code-block-added-border: oklch(68% 0.16 150deg);
  --code-block-added-marker: color-mix(in oklch, oklch(80% 0.15 150deg) 90%, var(--foreground));
  --code-block-removed: color-mix(in oklch, oklch(62% 0.2 25deg) 20%, transparent);
  --code-block-removed-border: oklch(66% 0.2 25deg);
  --code-block-removed-marker: color-mix(in oklch, oklch(76% 0.15 25deg) 90%, var(--foreground));
  --code-block-word: color-mix(in oklch, var(--foreground) 12%, transparent);
  --code-block-word-border: color-mix(in oklch, var(--foreground) 28%, transparent);
  --code-block-destructive-foreground: color-mix(in oklch, var(--destructive) 45%, var(--foreground));
}

/* Line numbers, diff markers, and focus dimming rely on counters and pseudo-elements. */
[data-numbered] > code > [data-slot='code-block-line']::before {
  width: var(--code-block-gutter, 2ch);
  flex: none;
  margin-right: 1.25rem;
  color: var(--code-block-line-number);
  content: counter(code-block-line);
  content: counter(code-block-line) / '';
  counter-increment: code-block-line;
  text-align: right;
  user-select: none;
}

[data-slot='code-block-line'][data-variant='added']::after,
[data-slot='code-block-line'][data-variant='removed']::after {
  position: absolute;
  top: 0;
  left: calc(var(--code-block-padding-x) / 2 - 0.25ch);
  user-select: none;
}

[data-slot='code-block-line'][data-variant='added']::after {
  color: var(--code-block-added-marker);
  content: '+';
  content: '+' / '';
}

[data-slot='code-block-line'][data-variant='removed']::after {
  color: var(--code-block-removed-marker);
  content: '−';
  content: '−' / '';
}

[data-focus] > code > [data-slot='code-block-line']:not([data-focused]) {
  filter: blur(0.5px);
  opacity: 0.45;
  transition: opacity 200ms ease, filter 200ms ease;
}

[data-focus]:hover > code > [data-slot='code-block-line'],
[data-focus]:focus-within > code > [data-slot='code-block-line'] {
  filter: none;
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  [data-focus] > code > [data-slot='code-block-line'] {
    transition: none;
  }
}

@media (forced-colors: active) {
  [data-slot='code-block-line'][data-variant='highlighted'],
  [data-slot='code-block-line'][data-variant='added'],
  [data-slot='code-block-line'][data-variant='removed'] {
    outline: 1px solid CanvasText;
    outline-offset: -1px;
  }
}

/* Tokens from a pair of shiki themes carry both colors; the `.dark` class picks one. */
[data-slot='code-block-content'] [style*='--shiki-light'] {
  color: var(--shiki-light);
  font-style: var(--shiki-light-font-style, inherit);
  font-weight: var(--shiki-light-font-weight, inherit);
  text-decoration: var(--shiki-light-text-decoration, inherit);
}

.dark [data-slot='code-block-content'] [style*='--shiki-dark'] {
  color: var(--shiki-dark);
  font-style: var(--shiki-dark-font-style, inherit);
  font-weight: var(--shiki-dark-font-weight, inherit);
  text-decoration: var(--shiki-dark-text-decoration, inherit);
}
</style>
