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
   * Group parts: `SidebarGroupLabel`, `SidebarGroupAction`, and `SidebarGroupContent`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="sidebar-group"
    data-sidebar="group"
    class="sigma-ui-sidebar-group"
    v-bind="delegatedAttrs()"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
@layer components {
  .sigma-ui-sidebar-group {
    position: relative;
    display: flex;
    width: 100%;
    min-width: 0;
    flex-direction: column;
    padding: calc(var(--spacing) * 2);
  }
}
</style>
