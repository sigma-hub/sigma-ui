<script setup lang="ts">
import { DropdownMenuLabel, type DropdownMenuLabelProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<DropdownMenuLabelProps & { inset?: boolean }>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DropdownMenuLabel
    v-bind="forwardedProps"
    :class="cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', $attrs.class ?? '')"
  >
    <slot />
  </DropdownMenuLabel>
</template>
