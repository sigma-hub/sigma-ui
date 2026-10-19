<script setup lang="ts">
import { useAttrs } from 'vue';

import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

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
    v-bind="delegatedAttrs()"
    :data-variant="props.variant"
    :class="cn('mb-3 font-medium data-[variant=label]:text-sm data-[variant=legend]:text-base', $attrs.class ?? '')"
  >
    <slot />
  </legend>
</template>
