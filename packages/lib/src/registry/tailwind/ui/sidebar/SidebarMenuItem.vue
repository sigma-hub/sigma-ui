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
   * A `SidebarMenuButton`, plus an optional `SidebarMenuAction`, `SidebarMenuBadge`, or `SidebarMenuSub`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <li
    data-slot="sidebar-menu-item"
    v-bind="delegatedAttrs()"
    data-sidebar="menu-item"
    :class="cn('group/menu-item relative', $attrs.class ?? '')"
  >
    <slot />
  </li>
</template>
