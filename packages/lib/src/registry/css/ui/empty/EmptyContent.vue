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
   * Actions, such as a button, under the description.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    v-bind="delegatedAttrs"
    data-slot="empty-content"
    class="sigma-ui-empty-content"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-empty-content {
  display: flex;
  width: 100%;
  min-width: 0;
  max-width: 24rem;
  flex-direction: column;
  align-items: center;
  font-size: 0.875rem;
  gap: 1rem;
  text-wrap: balance;
}
</style>
