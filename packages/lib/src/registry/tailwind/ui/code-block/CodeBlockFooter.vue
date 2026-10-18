<script setup lang="ts">
import { useAttrs } from 'vue';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

defineSlots<{
  /** Content below the code, such as a `CodeBlockExpandButton`. */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    v-bind="delegatedAttrs()"
    data-slot="code-block-footer"
    :class="cn('flex min-w-0 shrink-0 items-center justify-center gap-2 border-t border-(--code-block-border) p-1 text-muted-foreground empty:hidden', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
