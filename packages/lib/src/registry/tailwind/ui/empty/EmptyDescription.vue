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
   * Explanation of the empty state. Links inside it are underlined.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <p
    v-bind="delegatedAttrs"
    data-slot="empty-description"
    :class="cn('text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary', $attrs.class ?? '')"
  >
    <slot />
  </p>
</template>
