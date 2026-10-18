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
   * Content that spans the full width above the row body.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="item-header"
    v-bind="delegatedAttrs()"
    :class="cn('flex basis-full items-center justify-between gap-2', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
