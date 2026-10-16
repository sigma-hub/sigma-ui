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
   * Header content, such as a team switcher or a search input.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="sidebar-header"
    data-sidebar="header"
    class="sigma-ui-sidebar-header"
    v-bind="delegatedAttrs"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-sidebar-header {
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  gap: 0.5rem;
}
</style>
