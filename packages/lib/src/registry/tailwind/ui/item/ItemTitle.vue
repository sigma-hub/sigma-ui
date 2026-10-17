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
   * Primary text of the row.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    v-bind="delegatedAttrs()"
    data-slot="item-title"
    :class="cn('flex w-fit items-center gap-2 text-sm leading-snug font-medium', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
