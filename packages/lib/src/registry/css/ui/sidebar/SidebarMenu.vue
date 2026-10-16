<script setup lang="ts">
import { computed, useAttrs } from 'vue';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

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
    v-bind="delegatedAttrs"
    :class="[$attrs.class]"
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
