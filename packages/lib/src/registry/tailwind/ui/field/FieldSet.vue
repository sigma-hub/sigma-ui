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
    v-bind="delegatedAttrs()"
    :class="cn('flex flex-col gap-6 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3', $attrs.class ?? '')"
  >
    <slot />
  </fieldset>
</template>
