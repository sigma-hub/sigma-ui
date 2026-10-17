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
   * Footer content, such as a user menu.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    v-bind="delegatedAttrs()"
    data-slot="sidebar-footer"
    data-sidebar="footer"
    :class="cn('flex flex-col gap-2 p-2', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
