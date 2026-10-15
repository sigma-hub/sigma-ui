<script setup lang="ts">
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
  gap: 1.5rem;
}

.sigma-ui-field-set:has(> [data-slot="checkbox-group"]),
.sigma-ui-field-set:has(> [data-slot="radio-group"]) {
  gap: 0.75rem;
}
</style>
