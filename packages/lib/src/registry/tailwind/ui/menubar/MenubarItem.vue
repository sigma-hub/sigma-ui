<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  MenubarItem,
  type MenubarItemEmits,
  type MenubarItemProps,
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

const props = defineProps<MenubarItemProps & {
  /** Adds left padding so the text lines up with items that have an icon or indicator. */
  inset?: boolean;
}>();
const emits = defineEmits<MenubarItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <MenubarItem
    data-slot="menubar-item"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn(
      'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-secondary focus:text-secondary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      inset && 'pl-8',
      $attrs.class ?? '',
    )"
  >
    <slot />
  </MenubarItem>
</template>
