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
   * Label of the option.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <option
    v-bind="delegatedAttrs"
    data-slot="native-select-option"
    :class="cn('bg-popover text-popover-foreground', $attrs.class ?? '')"
  >
    <slot />
  </option>
</template>
