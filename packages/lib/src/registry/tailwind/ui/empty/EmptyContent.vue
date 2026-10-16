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
   * Actions, such as a button, under the description.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    v-bind="delegatedAttrs"
    data-slot="empty-content"
    :class="cn('flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
