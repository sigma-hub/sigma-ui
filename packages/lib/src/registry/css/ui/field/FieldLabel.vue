<script setup lang="ts">
import { useAttrs } from 'vue';

import type { LabelProps } from 'reka-ui';
import { Label } from '@ui/registry/css/ui/label';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

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
    v-bind="{ ...props, ...delegatedAttrs() }"
    data-slot="field-label"
    class="sigma-ui-field-label"
    :class="[$attrs.class]"
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
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}

.sigma-ui-field-label > [data-slot="field"] {
  padding: 1rem;
}

.sigma-ui-label.sigma-ui-field-label:has([data-state="checked"]) {
  border-color: var(--primary);
  background-color: color-mix(in oklch, var(--primary) 5%, transparent);
}
</style>
