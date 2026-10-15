<script setup lang="ts">
import { cn } from '@ui/utils';

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
    data-sidebar="menu-item"
    :class="cn('group/menu-item relative', $attrs.class ?? '')"
  >
    <slot />
  </li>
</template>
