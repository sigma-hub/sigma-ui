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
   * Text or an icon shown inside an addon.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <span
    v-bind="delegatedAttrs"
    data-slot="input-group-text"
    :class="cn('flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*=size-])]:size-4', $attrs.class ?? '')"
  >
    <slot />
  </span>
</template>
