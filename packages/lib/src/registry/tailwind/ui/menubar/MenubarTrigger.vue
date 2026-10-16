<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { MenubarTrigger, type MenubarTriggerProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<MenubarTriggerProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <MenubarTrigger
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    :class="
      cn(
        'flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-hidden focus:bg-secondary focus:text-secondary-foreground data-[state=open]:bg-secondary data-[state=open]:text-secondary-foreground hover:bg-secondary/50 hover:transition-bg duration-200',
        $attrs.class ?? '',
      )
    "
    data-slot="menubar-trigger"
  >
    <slot />
  </MenubarTrigger>
</template>
