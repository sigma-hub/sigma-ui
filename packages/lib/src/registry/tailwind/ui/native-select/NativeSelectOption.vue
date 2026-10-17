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
   * Label of the option.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <option
    v-bind="delegatedAttrs()"
    data-slot="native-select-option"
    :class="cn('bg-popover text-popover-foreground', $attrs.class ?? '')"
  >
    <slot />
  </option>
</template>
