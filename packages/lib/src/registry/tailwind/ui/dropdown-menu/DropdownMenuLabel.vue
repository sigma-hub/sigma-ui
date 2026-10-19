<script setup lang="ts">
import { useAttrs } from 'vue';

import { DropdownMenuLabel, type DropdownMenuLabelProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<DropdownMenuLabelProps & {
  /** Adds left padding to align with items that have an icon or indicator. */
  inset?: boolean;
}>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DropdownMenuLabel
    data-slot="dropdown-menu-label"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', $attrs.class ?? '')"
  >
    <slot />
  </DropdownMenuLabel>
</template>
