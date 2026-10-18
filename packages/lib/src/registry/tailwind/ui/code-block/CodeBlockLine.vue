<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import {
  type CodeBlockLineVariant,
  type CodeToken,
  type WordMatcher,
  findWordRanges,
  segmentLine,
} from '@ui/registry/shared/ui/code-block/lines';
import { cn } from '@ui/utils';
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
    v-bind="delegatedAttrs()"
    data-slot="code-block-line"
    :data-variant="props.variant"
    :data-focused="props.focused || undefined"
    :class="cn('relative flex min-h-lh px-(--code-block-padding-x) data-[variant=added]:bg-(--code-block-added) data-[variant=added]:shadow-[inset_2px_0_0_var(--code-block-added-border)] data-[variant=highlighted]:bg-(--code-block-highlighted) data-[variant=highlighted]:shadow-[inset_2px_0_0_var(--code-block-highlighted-border)] data-[variant=removed]:bg-(--code-block-removed) data-[variant=removed]:shadow-[inset_2px_0_0_var(--code-block-removed-border)] [[data-diff]>code>&]:pl-[calc(var(--code-block-padding-x)+1ch)]', $attrs.class ?? '')"
  >
    <span
      v-if="props.variant === 'added' || props.variant === 'removed'"
      class="sr-only select-none"
    >{{ props.variant === 'added' ? props.addedLabel : props.removedLabel }} </span>
    <span
      data-slot="code-block-line-content"
      class="min-w-0 flex-1"
    ><template v-if="segments === null"><slot /></template><template v-else-if="isEmpty">{{ '\n' }}</template><template
      v-for="(segment, index) in segments"
      v-else
      :key="index"
    ><mark
      v-if="segment.type === 'mark'"
      data-slot="code-block-word"
      class="rounded-[0.1875rem] bg-(--code-block-word) text-inherit shadow-[0_0_0_1px_var(--code-block-word-border),0_0_0_2px_var(--code-block-word)]"
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
