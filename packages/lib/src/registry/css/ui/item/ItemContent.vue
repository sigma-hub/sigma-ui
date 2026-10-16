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
   * Title and description.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    v-bind="delegatedAttrs"
    data-slot="item-content"
    class="sigma-ui-item-content"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-item-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.25rem;
}

.sigma-ui-item-content + .sigma-ui-item-content {
  flex: none;
}
</style>
