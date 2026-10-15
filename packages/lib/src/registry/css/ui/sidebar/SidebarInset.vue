<script setup lang="ts">
defineSlots<{
  /**
   * Main page content rendered next to the sidebar.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <main
    data-slot="sidebar-inset"
    class="sigma-ui-sidebar-inset"
  >
    <slot />
  </main>
</template>

<style>
.sigma-ui-sidebar-inset {
  position: relative;
  display: flex;
  width: 100%;
  flex: 1;
  flex-direction: column;
  background-color: hsl(var(--background));
}

@media (width >= 768px) {
  .sigma-ui-sidebar[data-variant="inset"] ~ .sigma-ui-sidebar-inset {
    border-radius: calc(var(--radius) + 4px);
    margin: 0.5rem;
    margin-left: 0;
    box-shadow: 0 1px 3px rgb(0 0 0 / 10%), 0 1px 2px -1px rgb(0 0 0 / 10%);
  }

  .sigma-ui-sidebar[data-variant="inset"][data-state="collapsed"] ~ .sigma-ui-sidebar-inset {
    margin-left: 0.5rem;
  }
}
</style>
