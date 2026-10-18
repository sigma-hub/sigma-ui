<script setup lang="ts">
import { useAttrs } from 'vue';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

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
    v-bind="delegatedAttrs()"
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
  gap: calc(var(--spacing) * 1);
  list-style: none;
}
</style>
