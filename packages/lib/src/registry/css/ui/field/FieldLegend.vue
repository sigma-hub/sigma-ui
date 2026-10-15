<script setup lang="ts">
interface FieldLegendProps {
  /**
   * `legend` renders a section heading, `label` matches the size of a field label.
   */
  variant?: 'legend' | 'label';
}

const props = withDefaults(defineProps<FieldLegendProps>(), {
  variant: 'legend',
});

defineSlots<{
  /**
   * Legend text of the `FieldSet`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <legend
    data-slot="field-legend"
    :data-variant="props.variant"
    class="sigma-ui-field-legend"
  >
    <slot />
  </legend>
</template>

<style>
.sigma-ui-field-legend {
  padding: 0;
  margin-bottom: 0.75rem;
  font-size: 1rem;
  font-weight: 500;
}

.sigma-ui-field-legend[data-variant="label"] {
  font-size: 0.875rem;
}
</style>
