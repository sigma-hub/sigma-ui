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
   * `FieldLabel` or `FieldTitle` with a `FieldDescription`, placed next to a checkbox, radio, or switch.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <div
    v-bind="delegatedAttrs"
    data-slot="field-content"
    :class="cn('group/field-content flex flex-1 flex-col gap-1.5 leading-snug', $attrs.class ?? '')"
  >
    <slot />
  </div>
</template>
