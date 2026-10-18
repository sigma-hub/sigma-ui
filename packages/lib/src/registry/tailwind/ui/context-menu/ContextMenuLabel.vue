<script setup lang="ts">
import { useAttrs } from 'vue';

import { ContextMenuLabel, type ContextMenuLabelProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ContextMenuLabelProps & {
  /** Adds left padding to align with items that have an icon or indicator. */
  inset?: boolean;
}>();
</script>

<template>
  <ContextMenuLabel
    data-slot="context-menu-label"
    v-bind="{ ...props, ...delegatedAttrs() }"
    :class="
      cn('px-2 py-1.5 text-sm font-semibold text-foreground',
         inset && 'pl-8', $attrs.class ?? '',
      )"
  >
    <slot />
  </ContextMenuLabel>
</template>
