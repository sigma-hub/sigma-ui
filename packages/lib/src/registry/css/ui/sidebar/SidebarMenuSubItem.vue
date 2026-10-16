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
   * A `SidebarMenuSubButton`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <li
    data-slot="sidebar-menu-sub-item"
    data-sidebar="menu-sub-item"
    class="sigma-ui-sidebar-menu-sub-item"
    v-bind="delegatedAttrs"
    :class="[$attrs.class]"
  >
    <slot />
  </li>
</template>

<style>
.sigma-ui-sidebar-menu-sub-item {
  position: relative;
}
</style>
