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
    v-bind="delegatedAttrs"
    :class="[$attrs.class]"
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
