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
   * Group body, usually a `SidebarMenu`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="sidebar-group-content"
    data-sidebar="group-content"
    class="sigma-ui-sidebar-group-content"
    v-bind="delegatedAttrs"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-sidebar-group-content {
  width: 100%;
  font-size: 0.875rem;
}
</style>
