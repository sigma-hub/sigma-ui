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
   * `EmptyMedia`, `EmptyTitle`, and `EmptyDescription`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    v-bind="delegatedAttrs"
    data-slot="empty-header"
    :class="cn('flex max-w-sm flex-col items-center gap-2 text-center', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
