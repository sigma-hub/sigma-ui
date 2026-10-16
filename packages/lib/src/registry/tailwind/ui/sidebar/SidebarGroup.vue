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
   * Group parts: `SidebarGroupLabel`, `SidebarGroupAction`, and `SidebarGroupContent`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    v-bind="delegatedAttrs"
    data-slot="sidebar-group"
    data-sidebar="group"
    :class="cn('relative flex w-full min-w-0 flex-col p-2', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
