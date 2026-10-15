<script setup lang="ts">
defineSlots<{
  /**
   * List of `SidebarMenuItem` components.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <ul
    data-slot="sidebar-menu"
    data-sidebar="menu"
    class="sigma-ui-sidebar-menu"
  >
    <slot />
  </ul>
</template>

<style>
.sigma-ui-sidebar-menu {
  display: flex;
  width: 100%;
  min-width: 0;
  flex-direction: column;
  padding: 0;
  margin: 0;
  gap: 0.25rem;
  list-style: none;
}
</style>
