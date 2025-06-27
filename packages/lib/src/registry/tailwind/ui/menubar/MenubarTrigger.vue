<script setup lang="ts">
import { MenubarTrigger, type MenubarTriggerProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<MenubarTriggerProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <MenubarTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-hidden focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground hover:bg-accent/50 hover:transition-bg duration-200',
        $attrs.class ?? '',
      )
    "
  >
    <slot />
  </MenubarTrigger>
</template>
