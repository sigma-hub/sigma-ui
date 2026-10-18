<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import {
  type CodeBlockLineVariant,
  type CodeToken,
  type WordMatcher,
  findWordRanges,
  segmentLine,
} from '@ui/registry/shared/ui/code-block/lines';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(defineProps<{
  /** State of the line. `added` and `removed` show a `+` or `−` marker. */
  variant?: CodeBlockLineVariant;
  /** Keeps the line at full opacity while other lines are dimmed by focus. */
  focused?: boolean;
  /** Highlighted tokens, as returned by `useHighlightedCode`. Without tokens, the default slot is rendered. */
  tokens?: CodeToken[];
  /** Words or patterns to mark in the tokens. */
  words?: WordMatcher[];
  /** Screen reader prefix for an added line. */
  addedLabel?: string;
  /** Screen reader prefix for a removed line. */
  removedLabel?: string;
}>(), {
  variant: 'default',
  focused: false,
  tokens: undefined,
  words: () => [],
  addedLabel: 'Added:',
  removedLabel: 'Removed:',
});

defineSlots<{
  /** Line content, used when `tokens` is not set. */
  default?: () => unknown;
}>();

const segments = computed(() => {
  if (!props.tokens) {
    return null;
  }

  const text = props.tokens.map(token => token.content).join('');
  return segmentLine(props.tokens, props.words.length ? findWordRanges(text, props.words) : []);
});

const isEmpty = computed(() => segments.value !== null && segments.value.length === 0);
</script>

<template>
  <span
    data-slot="code-block-line"
    v-bind="delegatedAttrs()"
    :data-variant="props.variant"
    :data-focused="props.focused || undefined"
    class="sigma-ui-code-block__line"
    :class="[$attrs.class]"
  >
    <span
      v-if="props.variant === 'added' || props.variant === 'removed'"
      class="sigma-ui-code-block__line-label sr-only"
    >{{ props.variant === 'added' ? props.addedLabel : props.removedLabel }} </span>
    <span
      data-slot="code-block-line-content"
      class="sigma-ui-code-block__line-content"
    ><template v-if="segments === null"><slot /></template><template v-else-if="isEmpty">{{ '\n' }}</template><template
      v-for="(segment, index) in segments"
      v-else
      :key="index"
    ><mark
      v-if="segment.type === 'mark'"
      data-slot="code-block-word"
      class="sigma-ui-code-block__word"
    ><span
      v-for="(token, tokenIndex) in segment.tokens"
      :key="tokenIndex"
      :style="token.style"
    >{{ token.content }}</span></mark><span
      v-else
      :style="segment.token.style"
    >{{ segment.token.content }}</span></template></span>
  </span>
</template>

<style>
.sigma-ui-code-block__line {
  position: relative;
  display: flex;
  min-height: 1lh;
  padding: 0 var(--code-block-padding-x);
}

[data-diff] > code > .sigma-ui-code-block__line {
  padding-left: calc(var(--code-block-padding-x) + 1ch);
}

[data-numbered] > code > .sigma-ui-code-block__line::before {
  width: var(--code-block-gutter, 2ch);
  flex: none;
  margin-right: calc(var(--spacing) * 5);
  color: var(--code-block-line-number);
  content: counter(code-block-line);
  content: counter(code-block-line) / '';
  counter-increment: code-block-line;
  text-align: right;
  user-select: none;
}

.sigma-ui-code-block__line[data-variant='highlighted'] {
  background-color: var(--code-block-highlighted);
  box-shadow: inset 2px 0 0 var(--code-block-highlighted-border);
}

.sigma-ui-code-block__line[data-variant='added'] {
  background-color: var(--code-block-added);
  box-shadow: inset 2px 0 0 var(--code-block-added-border);
}

.sigma-ui-code-block__line[data-variant='removed'] {
  background-color: var(--code-block-removed);
  box-shadow: inset 2px 0 0 var(--code-block-removed-border);
}

.sigma-ui-code-block__line[data-variant='added']::after,
.sigma-ui-code-block__line[data-variant='removed']::after {
  position: absolute;
  top: 0;
  left: calc(var(--code-block-padding-x) / 2 - 0.25ch);
  user-select: none;
}

.sigma-ui-code-block__line[data-variant='added']::after {
  color: var(--code-block-added-marker);
  content: '+';
  content: '+' / '';
}

.sigma-ui-code-block__line[data-variant='removed']::after {
  color: var(--code-block-removed-marker);
  content: '−';
  content: '−' / '';
}

.sigma-ui-code-block__line-label {
  user-select: none;
}

.sigma-ui-code-block__line-content {
  min-width: 0;
  flex: 1;
}

.sigma-ui-code-block__word {
  border-radius: 0.1875rem;
  background-color: var(--code-block-word);
  box-shadow: 0 0 0 1px var(--code-block-word-border), 0 0 0 2px var(--code-block-word);
  color: inherit;
}

[data-focus] > code > .sigma-ui-code-block__line:not([data-focused]) {
  filter: blur(0.5px);
  opacity: 0.45;
  transition: opacity 200ms ease, filter 200ms ease;
}

[data-focus]:hover > code > .sigma-ui-code-block__line,
[data-focus]:focus-within > code > .sigma-ui-code-block__line {
  filter: none;
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  [data-focus] > code > .sigma-ui-code-block__line {
    transition: none;
  }
}

@media (forced-colors: active) {
  .sigma-ui-code-block__line[data-variant='highlighted'],
  .sigma-ui-code-block__line[data-variant='added'],
  .sigma-ui-code-block__line[data-variant='removed'] {
    outline: 1px solid CanvasText;
    outline-offset: -1px;
  }
}
</style>
