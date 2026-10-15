<script setup lang="ts">
defineSlots<{
  /**
   * List of `SidebarMenuSubItem` components.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <ul
    data-slot="sidebar-menu-sub"
    data-sidebar="menu-sub"
    class="sigma-ui-sidebar-menu-sub"
  >
    <slot />
  </ul>
</template>

<style>
.sigma-ui-sidebar-menu-sub {
  display: flex;
  min-width: 0;
  flex-direction: column;
  padding: 0.125rem 0.625rem;
  border-left: 1px solid var(--border);
  margin: 0 0.875rem;
  gap: 0.25rem;
  list-style: none;
  transform: translateX(1px);
}

.sigma-ui-sidebar[data-collapsible="icon"] .sigma-ui-sidebar-menu-sub {
  display: none;
}
</style>
