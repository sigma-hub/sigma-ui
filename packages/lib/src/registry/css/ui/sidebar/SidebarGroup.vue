<script setup lang="ts">
defineSlots<{
  /**
   * Group parts: `SidebarGroupLabel`, `SidebarGroupAction`, and `SidebarGroupContent`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="sidebar-group"
    data-sidebar="group"
    class="sigma-ui-sidebar-group"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-sidebar-group {
  position: relative;
  display: flex;
  width: 100%;
  min-width: 0;
  flex-direction: column;
  padding: 0.5rem;
}
</style>
