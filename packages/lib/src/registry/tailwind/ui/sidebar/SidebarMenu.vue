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
   * List of `SidebarMenuItem` components.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <ul
    v-bind="delegatedAttrs"
    data-slot="sidebar-menu"
    data-sidebar="menu"
    :class="cn('flex w-full min-w-0 flex-col gap-1', $attrs.class ?? '')"
  >
    <slot />
  </ul>
</template>
