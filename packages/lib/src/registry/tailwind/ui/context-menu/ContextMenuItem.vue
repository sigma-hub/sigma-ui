<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  ContextMenuItem,
  type ContextMenuItemEmits,
  type ContextMenuItemProps,
  useForwardPropsEmits,
} from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ContextMenuItemProps & {
  /** Adds left padding to align with items that have an icon or indicator. */
  inset?: boolean;
}>();
const emits = defineEmits<ContextMenuItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ContextMenuItem
    data-slot="context-menu-item"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-secondary focus:text-secondary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      $attrs.class ?? '',
    )"
  >
    <slot />
  </ContextMenuItem>
</template>
