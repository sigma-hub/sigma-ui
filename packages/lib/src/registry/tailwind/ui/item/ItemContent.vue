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
   * Title and description.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="item-content"
    v-bind="delegatedAttrs()"
    :class="cn('flex flex-1 flex-col gap-1 [&+[data-slot=item-content]]:flex-none', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
