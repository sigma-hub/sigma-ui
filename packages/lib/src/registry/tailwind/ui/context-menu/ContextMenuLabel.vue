<script setup lang="ts">
import { ContextMenuLabel, type ContextMenuLabelProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<ContextMenuLabelProps & {
  /** Adds left padding to align with items that have an icon or indicator. */
  inset?: boolean;
}>();
</script>

<template>
  <ContextMenuLabel
    v-bind="props"
    :class="
      cn('px-2 py-1.5 text-sm font-semibold text-foreground',
         inset && 'pl-8', $attrs.class ?? '',
      )"
  >
    <slot />
  </ContextMenuLabel>
</template>
