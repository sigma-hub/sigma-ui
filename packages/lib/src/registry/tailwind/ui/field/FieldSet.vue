<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

defineSlots<{
  /**
   * A `FieldLegend`, an optional `FieldDescription`, and a `FieldGroup`.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <fieldset
    v-bind="delegatedAttrs"
    data-slot="field-set"
    :class="cn('flex flex-col gap-6 has-[>[data-slot=checkbox-group]]:gap-3 has-[>[data-slot=radio-group]]:gap-3', $attrs.class ?? '')"
  >
    <slot />
  </fieldset>
</template>
