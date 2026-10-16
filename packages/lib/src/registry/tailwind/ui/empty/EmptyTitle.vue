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
   * Short title of the empty state.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    v-bind="delegatedAttrs"
    data-slot="empty-title"
    :class="cn('text-lg font-medium tracking-tight', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
