<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

defineSlots<{
  /**
   * `EmptyHeader`, `EmptyMedia`, and `EmptyContent`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    v-bind="delegatedAttrs"
    data-slot="empty"
    :class="cn('flex min-w-0 flex-1 flex-col items-center justify-center gap-6 rounded-lg border border-dashed border-border p-6 text-center text-balance md:p-12', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
