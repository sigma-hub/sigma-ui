<script setup lang="ts">
import {
  computed,
  onBeforeUnmount,
  ref,
  useAttrs,
  useId,
  useTemplateRef,
  watch,
  watchEffect,
} from 'vue';
import { Primitive } from 'reka-ui';
import { useResizeObserver } from '@vueuse/core';
import { toCssLength, useCodeBlockContext } from '@ui/registry/shared/ui/code-block/code-block-state';
import {
  type CodeBlockLineVariant,
  type CodeToken,
  type LineSelector,
  type WordMatcher,
  parseLineSelector,
  prepareCode,
  resolveLineVariant,
} from '@ui/registry/shared/ui/code-block/lines';
import CodeBlockLine from './CodeBlockLine.vue';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(defineProps<{
  /** The code to show. It is also what `CodeBlockCopyButton` copies. One trailing newline is ignored. */
  code?: string;
  /** Highlighted tokens from `useHighlightedCode`, one array per line. Plain text is shown until they arrive. */
  lines?: CodeToken[][] | null;
  /** Language name, set as `data-language`. Highlighting itself comes from `useHighlightedCode`. */
  language?: string;
  /** Wraps long lines instead of scrolling. Defaults to the `CodeBlock` wrap state. */
  wrap?: boolean;
  /** Numbers each line. Numbers are not selected or copied. */
  lineNumbers?: boolean;
  /** Number of the first line when `lineNumbers` is set. */
  startLine?: number;
  /** Lines to highlight, as `"1,4-6"` or `[1, 4, 5, 6]`. Counts lines of `code` from 1, whatever `startLine` is. */
  highlightLines?: LineSelector;
  /** Lines to keep in focus while the others are dimmed. Same format as `highlightLines`. */
  focusLines?: LineSelector;
  /** Lines to show as added. Same format as `highlightLines`. */
  addedLines?: LineSelector;
  /** Lines to show as removed. Same format as `highlightLines`. */
  removedLines?: LineSelector;
  /** Reads a leading `+`, `-`, or space on each line as a diff marker and hides it. */
  diff?: boolean;
  /** Reads `[!code highlight]`, `[!code focus]`, `[!code ++]`, `[!code --]`, and `[!code word:…]` comments and hides them. */
  notation?: boolean;
  /** Words or regular expressions to mark on every line. */
  highlightWords?: WordMatcher[];
  /** Caps the height; the content scrolls inside. A number is in pixels. */
  maxHeight?: string | number;
  /** Height while collapsed. Add a `CodeBlockExpandButton` to show the rest. */
  collapsedHeight?: string | number;
  /** `auto` makes the content focusable only when it scrolls, so keyboard users can scroll it. */
  tabindex?: number | 'auto';
  /** Screen reader prefix for added lines. */
  addedLabel?: string;
  /** Screen reader prefix for removed lines. */
  removedLabel?: string;
}>(), {
  code: undefined,
  lines: undefined,
  language: undefined,
  wrap: undefined,
  lineNumbers: false,
  startLine: 1,
  highlightLines: undefined,
  focusLines: undefined,
  addedLines: undefined,
  removedLines: undefined,
  diff: false,
  notation: false,
  highlightWords: () => [],
  maxHeight: undefined,
  collapsedHeight: undefined,
  tabindex: 'auto',
  addedLabel: 'Added:',
  removedLabel: 'Removed:',
});

const slots = defineSlots<{
  /** Hand-built `CodeBlockLine` elements. When set, `code` is only used for copying. */
  default?: () => unknown;
  /** Replaces the content of each generated line. */
  line?: (props: { text: string; tokens: CodeToken[] | undefined; number: number; sourceLine: number; variant: CodeBlockLineVariant }) => unknown;
}>();

const context = useCodeBlockContext();
const generatedId = useId();
const id = computed(() => (attrs.id as string | undefined) ?? generatedId);
const pre = useTemplateRef<{ $el?: HTMLElement }>('pre');
const overflowing = ref(false);
const contentOverflows = ref(false);

const prepared = computed(() => prepareCode(props.code ?? '', { diff: props.diff, notation: props.notation }));
const selectors = computed(() => ({
  highlightLines: parseLineSelector(props.highlightLines),
  addedLines: parseLineSelector(props.addedLines),
  removedLines: parseLineSelector(props.removedLines),
  focusLines: parseLineSelector(props.focusLines),
}));

const tokens = computed(() => {
  const lines = props.lines;
  // Tokens for different code, such as while the highlighter catches up, are ignored.
  return lines && lines.length === prepared.value.lines.length ? lines : null;
});

const renderedLines = computed(() => prepared.value.lines.map((line, index) => ({
  ...line,
  number: props.startLine + index,
  variant: resolveLineVariant(line, selectors.value),
  focused: line.focused || selectors.value.focusLines.has(line.sourceLine),
  words: [...props.highlightWords, ...line.words],
  tokens: tokens.value?.[index] ?? [{ content: line.text }],
})));

const hasDiff = computed(() => renderedLines.value.some(line => line.variant === 'added' || line.variant === 'removed'));
const hasFocus = computed(() => renderedLines.value.some(line => line.focused));
const isPlain = computed(() => !props.lineNumbers
  && !tokens.value
  && !slots.line
  && renderedLines.value.every(line => line.variant === 'default' && !line.focused && line.words.length === 0));

const wrap = computed(() => props.wrap ?? context?.wrap.value ?? false);
const isCollapsible = computed(() => props.collapsedHeight !== undefined);
const isCollapsed = computed(() => isCollapsible.value && !(context?.expanded.value ?? false));
const gutter = computed(() => `${String(props.startLine + prepared.value.lines.length - 1).length}ch`);

const tabIndex = computed(() => {
  if (props.tabindex !== 'auto') {
    return props.tabindex;
  }

  return overflowing.value && !isCollapsed.value ? 0 : undefined;
});

function measure() {
  const element = pre.value?.$el;

  if (!element) {
    return;
  }

  const overflowsBlock = element.scrollHeight > element.clientHeight + 1;
  overflowing.value = overflowsBlock || element.scrollWidth > element.clientWidth + 1;

  if (isCollapsed.value) {
    contentOverflows.value = overflowsBlock;
  }
}

useResizeObserver(() => pre.value?.$el, measure);
watch([prepared, wrap, isCollapsed, () => props.maxHeight, () => props.collapsedHeight], () => {
  requestAnimationFrame(measure);
}, { flush: 'post' });

watchEffect(() => {
  if (!context) {
    return;
  }

  if (props.code !== undefined) {
    context.copyValue.value = prepared.value.copyText;
  }

  context.contentId.value = id.value;
  // An expanded block keeps its button, so it can be collapsed again.
  context.collapsible.value = isCollapsible.value && (contentOverflows.value || !isCollapsed.value);
});

onBeforeUnmount(() => {
  if (!context || context.contentId.value !== id.value) {
    return;
  }

  context.copyValue.value = undefined;
  context.contentId.value = undefined;
  context.collapsible.value = false;
});
</script>

<template>
  <Primitive
    v-bind="delegatedAttrs()"
    :id="id"
    ref="pre"
    as="pre"
    dir="ltr"
    data-slot="code-block-content"
    :data-language="props.language"
    :data-wrap="wrap || undefined"
    :data-numbered="props.lineNumbers || undefined"
    :data-diff="hasDiff || undefined"
    :data-focus="hasFocus || undefined"
    :data-collapsed="isCollapsed || undefined"
    :tabindex="tabIndex"
    :aria-labelledby="context?.titleId.value"
    :style="{
      'maxHeight': toCssLength(isCollapsed ? props.collapsedHeight : props.maxHeight),
      '--code-block-gutter': gutter,
    }"
    class="sigma-ui-code-block__content"
    :class="[$attrs.class]"
  >
    <code
      data-slot="code-block-code"
      :data-plain="isPlain && !slots.default ? '' : undefined"
      class="sigma-ui-code-block__code"
      :style="{ counterReset: `code-block-line ${props.startLine - 1}` }"
    ><slot v-if="slots.default" /><template v-else-if="isPlain">{{ prepared.code || '\n' }}</template><CodeBlockLine
      v-for="line in renderedLines"
      v-else
      :key="line.sourceLine"
      :variant="line.variant"
      :focused="line.focused"
      :tokens="slots.line ? undefined : line.tokens"
      :words="line.words"
      :added-label="props.addedLabel"
      :removed-label="props.removedLabel"
    ><slot
      name="line"
      :text="line.text"
      :tokens="tokens?.[line.number - props.startLine]"
      :number="line.number"
      :source-line="line.sourceLine"
      :variant="line.variant"
    /></CodeBlockLine></code>
  </Primitive>
</template>

<style>
.sigma-ui-code-block__content {
  --code-block-padding-x: 0.875rem;

  overflow: auto;
  min-width: 0;
  min-height: 0;
  padding: 0.75rem 0;
  margin: 0;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace);
  font-size: inherit;
  line-height: 1.7;
  outline: none;
  scrollbar-color: color-mix(in oklch, var(--muted-foreground) 40%, transparent) transparent;
  scrollbar-width: thin;
  tab-size: 2;
  text-align: left;
  white-space: pre;
}

[data-size='sm'] .sigma-ui-code-block__content {
  --code-block-padding-x: 0.625rem;

  padding: 0.5rem 0;
  line-height: 1.6;
}

.sigma-ui-code-block__content[data-wrap] {
  overflow-wrap: anywhere;
  white-space: pre-wrap;
}

.sigma-ui-code-block__content[data-collapsed] {
  overflow: hidden;
  mask-image: linear-gradient(to bottom, #000000 calc(100% - 3rem), transparent);
}

.sigma-ui-code-block__code {
  display: block;
  width: max-content;
  min-width: 100%;
  padding: 0;
  border-radius: 0;
  background: none;
  color: inherit;
  font: inherit;
}

.sigma-ui-code-block__code[data-plain] {
  padding: 0 var(--code-block-padding-x);
}

[data-wrap] > .sigma-ui-code-block__code {
  width: auto;
}

[data-variant='destructive'] .sigma-ui-code-block__content {
  color: var(--code-block-destructive-foreground);
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
