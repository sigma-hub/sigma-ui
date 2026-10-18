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
   * `NativeSelectOption` children of this group.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <optgroup
    data-slot="native-select-optgroup"
    v-bind="delegatedAttrs()"
    :class="cn('bg-popover text-popover-foreground', $attrs.class ?? '')"
  >
    <slot />
  </optgroup>
</template>
