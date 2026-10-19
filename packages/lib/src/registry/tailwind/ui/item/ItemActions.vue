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
   * Buttons or other controls at the end of the row.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="item-actions"
    v-bind="delegatedAttrs()"
    :class="cn('flex items-center gap-2', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
