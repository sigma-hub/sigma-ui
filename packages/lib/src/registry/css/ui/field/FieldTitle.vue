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
   * Title text. Use instead of `FieldLabel` when the title is not tied to a single control.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="field-label"
    class="sigma-ui-field-title"
    v-bind="delegatedAttrs"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-field-title {
  display: flex;
  width: fit-content;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
  gap: 0.5rem;
  line-height: 1.375;
}

.sigma-ui-field[data-disabled="true"] .sigma-ui-field-title {
  opacity: 0.5;
}
</style>
