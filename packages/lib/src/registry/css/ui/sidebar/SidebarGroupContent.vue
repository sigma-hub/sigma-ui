<script setup lang="ts">
defineSlots<{
  /**
   * Group body, usually a `SidebarMenu`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="sidebar-group-content"
    data-sidebar="group-content"
    class="sigma-ui-sidebar-group-content"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-sidebar-group-content {
  width: 100%;
  font-size: 0.875rem;
}
</style>
