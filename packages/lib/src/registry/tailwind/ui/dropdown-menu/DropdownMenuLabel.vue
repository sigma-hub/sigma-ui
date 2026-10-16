<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { DropdownMenuLabel, type DropdownMenuLabelProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<DropdownMenuLabelProps & {
  /** Adds left padding to align with items that have an icon or indicator. */
  inset?: boolean;
}>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DropdownMenuLabel
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    :class="cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', $attrs.class ?? '')"
    data-slot="dropdown-menu-label"
  >
    <slot />
  </DropdownMenuLabel>
</template>
