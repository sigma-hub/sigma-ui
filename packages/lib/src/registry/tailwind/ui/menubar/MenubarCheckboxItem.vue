<script setup lang="ts">
import {
  MenubarCheckboxItem,
  type MenubarCheckboxItemEmits,
  type MenubarCheckboxItemProps,
  MenubarItemIndicator,
  useForwardPropsEmits,
} from 'reka-ui';
import { CheckIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';

const props = defineProps<MenubarCheckboxItemProps>();
const emits = defineEmits<MenubarCheckboxItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <MenubarCheckboxItem
    v-bind="forwarded"
    :class="cn(
      'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      $attrs.class ?? '',
    )"
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <MenubarItemIndicator>
        <CheckIcon class="w-4 h-4" />
      </MenubarItemIndicator>
    </span>
    <slot />
  </MenubarCheckboxItem>
</template>
