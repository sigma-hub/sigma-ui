<script setup lang="ts">
import { useAttrs } from 'vue';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

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
    v-bind="delegatedAttrs()"
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
  gap: calc(var(--spacing) * 7);
}

.sigma-ui-field-group[data-slot="checkbox-group"] {
  gap: calc(var(--spacing) * 3);
}

.sigma-ui-field-group > .sigma-ui-field-group {
  gap: calc(var(--spacing) * 4);
}
</style>
