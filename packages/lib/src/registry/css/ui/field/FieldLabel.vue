<script setup lang="ts">
import type { LabelProps } from 'reka-ui';
import { Label } from '@ui/registry/css/ui/label';

const props = defineProps<LabelProps>();

defineSlots<{
  /**
   * Label text. Wrap a whole `Field` to turn it into a selectable card.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <Label
    v-bind="props"
    data-slot="field-label"
    class="sigma-ui-field-label"
  >
    <slot />
  </Label>
</template>

<style>
.sigma-ui-label.sigma-ui-field-label {
  display: flex;
  width: fit-content;
  gap: 0.5rem;
  line-height: 1.375;
}

.sigma-ui-field[data-disabled="true"] .sigma-ui-field-label {
  opacity: 0.5;
}

.sigma-ui-label.sigma-ui-field-label:has(> [data-slot="field"]) {
  width: 100%;
  flex-direction: column;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-md);
}

.sigma-ui-field-label > [data-slot="field"] {
  padding: 1rem;
}

.sigma-ui-label.sigma-ui-field-label:has([data-state="checked"]) {
  border-color: hsl(var(--primary));
  background-color: hsl(var(--primary) / 5%);
}
</style>
