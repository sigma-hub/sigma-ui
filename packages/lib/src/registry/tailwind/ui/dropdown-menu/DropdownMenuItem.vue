<script setup lang="ts">
import { DropdownMenuItem, type DropdownMenuItemProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<DropdownMenuItemProps & {
  /** Adds left padding to align with items that have an icon or indicator. */
  inset?: boolean;
}>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <DropdownMenuItem
    v-bind="forwardedProps"
    :class="cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden transition-colors focus:bg-secondary focus:text-secondary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      $attrs.class ?? '',
    )"
   data-slot="dropdown-menu-item">
    <slot />
  </DropdownMenuItem>
</template>
