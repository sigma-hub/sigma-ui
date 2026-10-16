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
   * A `SidebarMenuButton`, plus an optional `SidebarMenuAction`, `SidebarMenuBadge`, or `SidebarMenuSub`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <li
    v-bind="delegatedAttrs"
    data-slot="sidebar-menu-item"
    data-sidebar="menu-item"
    :class="cn('group/menu-item relative', $attrs.class ?? '')"
  >
    <slot />
  </li>
</template>
