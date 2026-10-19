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
  /**
   * Actions, such as a button, under the description.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="empty-content"
    v-bind="delegatedAttrs()"
    :class="cn('flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
