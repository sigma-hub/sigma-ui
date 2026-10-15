<script setup lang="ts">
import {
  ContextMenuItem,
  type ContextMenuItemEmits,
  type ContextMenuItemProps,
  useForwardPropsEmits,
} from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<ContextMenuItemProps & {
  /** Adds left padding to align with items that have an icon or indicator. */
  inset?: boolean;
}>();
const emits = defineEmits<ContextMenuItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ContextMenuItem
    v-bind="forwarded"
    :class="cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-secondary focus:text-secondary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      $attrs.class ?? '',
    )"
  >
    <slot />
  </ContextMenuItem>
</template>
