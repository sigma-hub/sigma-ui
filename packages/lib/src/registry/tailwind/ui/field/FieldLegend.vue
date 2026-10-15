<script setup lang="ts">
import { cn } from '@ui/utils';

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
    :class="cn('mb-3 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base', $attrs.class ?? '')"
  >
    <slot />
  </legend>
</template>
