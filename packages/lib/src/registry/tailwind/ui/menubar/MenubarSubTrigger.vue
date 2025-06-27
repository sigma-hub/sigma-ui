<script setup lang="ts">
import { MenubarSubTrigger, type MenubarSubTriggerProps, useForwardProps } from 'reka-ui';
import { ChevronRightIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';

const props = defineProps<MenubarSubTriggerProps & { inset?: boolean }>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <MenubarSubTrigger
    v-bind="forwardedProps"
    :class="cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground',
      inset && 'pl-8',
      $attrs.class ?? '',
    )"
  >
    <slot />
    <ChevronRightIcon class="ml-auto h-4 w-4" />
  </MenubarSubTrigger>
</template>
