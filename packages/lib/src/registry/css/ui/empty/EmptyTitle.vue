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
   * Short title of the empty state.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    v-bind="delegatedAttrs"
    data-slot="empty-title"
    class="sigma-ui-empty-title"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-empty-title {
  font-size: 1.125rem;
  font-weight: 500;
  letter-spacing: -0.025em;
}
</style>
