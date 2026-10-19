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
    v-bind="delegatedAttrs()"
    :class="[$attrs.class]"
  >
    <slot />
  </li>
</template>

<style>
@layer components {
  .sigma-ui-sidebar-menu-sub-item {
    position: relative;
  }
}
</style>
