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
   * `FieldLabel` or `FieldTitle` with a `FieldDescription`, placed next to a checkbox, radio, or switch.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="field-content"
    class="sigma-ui-field-content"
    v-bind="delegatedAttrs"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-field-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 0.375rem;
  line-height: 1.375;
}
</style>
