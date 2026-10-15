<script setup lang="ts">
defineSlots<{
  /**
   * A `SidebarMenuSubButton`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <li
    data-slot="sidebar-menu-sub-item"
    data-sidebar="menu-sub-item"
    class="sigma-ui-sidebar-menu-sub-item"
  >
    <slot />
  </li>
</template>

<style>
.sigma-ui-sidebar-menu-sub-item {
  position: relative;
}
</style>
