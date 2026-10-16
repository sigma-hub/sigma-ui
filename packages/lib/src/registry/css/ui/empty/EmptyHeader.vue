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
   * `EmptyMedia`, `EmptyTitle`, and `EmptyDescription`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    v-bind="delegatedAttrs"
    data-slot="empty-header"
    class="sigma-ui-empty-header"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-empty-header {
  display: flex;
  max-width: 24rem;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 0.5rem;
}
</style>
