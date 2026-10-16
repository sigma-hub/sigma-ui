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
   * `Field`, `FieldSet`, and `FieldSeparator` components.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    data-slot="field-group"
    class="sigma-ui-field-group"
    v-bind="delegatedAttrs"
    :class="[$attrs.class]"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-field-group {
  display: flex;
  width: 100%;
  flex-direction: column;
  container: field-group / inline-size;
  gap: 1.75rem;
}

.sigma-ui-field-group[data-slot="checkbox-group"] {
  gap: 0.75rem;
}

.sigma-ui-field-group > .sigma-ui-field-group {
  gap: 1rem;
}
</style>
