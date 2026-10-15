<script setup lang="ts">
defineSlots<{
  /**
   * Footer content, such as a user menu.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="sidebar-footer"
    data-sidebar="footer"
    class="sigma-ui-sidebar-footer"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-sidebar-footer {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.5rem;
}
</style>
