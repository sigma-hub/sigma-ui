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
   * A `SidebarMenuButton`, plus an optional `SidebarMenuAction`, `SidebarMenuBadge`, or `SidebarMenuSub`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <li
    data-slot="sidebar-menu-item"
    data-sidebar="menu-item"
    class="sigma-ui-sidebar-menu-item"
    v-bind="delegatedAttrs"
    :class="[$attrs.class]"
  >
    <slot />
  </li>
</template>

<style>
.sigma-ui-sidebar-menu-item {
  position: relative;
}
</style>
