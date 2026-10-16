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
   * Helper text. Links inside it are underlined.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <p
    v-bind="delegatedAttrs"
    data-slot="field-description"
    :class="cn(
      'text-sm leading-normal font-normal text-muted-foreground group-has-[[data-orientation=horizontal]]/field:text-balance',
      'last:mt-0 nth-last-2:-mt-1 [[data-variant=legend]+&]:-mt-1.5',
      '[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary',
      $attrs.class ?? '',
    )"
  >
    <slot />
  </p>
</template>
