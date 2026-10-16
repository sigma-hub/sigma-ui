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
   * `NativeSelectOption` children of this group.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <optgroup
    v-bind="delegatedAttrs"
    data-slot="native-select-optgroup"
    :class="cn('bg-popover text-popover-foreground', $attrs.class ?? '')"
  >
    <slot />
  </optgroup>
</template>
