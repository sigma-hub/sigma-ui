<script setup lang="ts">
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
    class="sigma-ui-sidebar-menu-item"
  >
    <slot />
  </li>
</template>

<style>
.sigma-ui-sidebar-menu-item {
  position: relative;
}
</style>
