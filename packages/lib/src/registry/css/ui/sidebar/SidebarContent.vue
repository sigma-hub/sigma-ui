<script setup lang="ts">
defineSlots<{
  /**
   * Scrollable sidebar body, usually one or more `SidebarGroup` components.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="sidebar-content"
    data-sidebar="content"
    class="sigma-ui-sidebar-content"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-sidebar-content {
  display: flex;
  overflow: auto;
  min-height: 0;
  flex: 1;
  flex-direction: column;
  gap: 0.5rem;
}

.sigma-ui-sidebar[data-collapsible="icon"] .sigma-ui-sidebar-content {
  overflow: hidden;
}
</style>
