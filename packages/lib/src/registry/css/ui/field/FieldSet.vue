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
   * A `FieldLegend`, an optional `FieldDescription`, and a `FieldGroup`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <fieldset
    data-slot="field-set"
    class="sigma-ui-field-set"
    v-bind="delegatedAttrs()"
    :class="[$attrs.class]"
  >
    <slot />
  </fieldset>
</template>

<style>
.sigma-ui-field-set {
  display: flex;
  min-width: 0;
  flex-direction: column;
  padding: 0;
  border: none;
  margin: 0;
  gap: calc(var(--spacing) * 6);
}

.sigma-ui-field-set:has(> [data-slot="checkbox-group"]),
.sigma-ui-field-set:has(> [data-slot="radio-group"]) {
  gap: calc(var(--spacing) * 3);
}
</style>
