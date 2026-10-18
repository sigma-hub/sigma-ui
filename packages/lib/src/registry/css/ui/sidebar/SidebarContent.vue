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
    v-bind="delegatedAttrs()"
    :class="[$attrs.class]"
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
  gap: calc(var(--spacing) * 2);
}

.sigma-ui-sidebar[data-collapsible="icon"] .sigma-ui-sidebar-content {
  overflow: hidden;
}
</style>
