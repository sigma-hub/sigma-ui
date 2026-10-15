<script setup lang="ts">
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
