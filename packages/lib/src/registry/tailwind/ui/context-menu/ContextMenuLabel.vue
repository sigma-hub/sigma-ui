<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { ContextMenuLabel, type ContextMenuLabelProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<ContextMenuLabelProps & {
  /** Adds left padding to align with items that have an icon or indicator. */
  inset?: boolean;
}>();
</script>

<template>
  <ContextMenuLabel
    v-bind="{ ...props, ...delegatedAttrs }"
    :class="
      cn('px-2 py-1.5 text-sm font-semibold text-foreground',
         inset && 'pl-8', $attrs.class ?? '',
      )"
    data-slot="context-menu-label"
  >
    <slot />
  </ContextMenuLabel>
</template>
