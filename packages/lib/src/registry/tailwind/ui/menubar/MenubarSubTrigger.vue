<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { MenubarSubTrigger, type MenubarSubTriggerProps, useForwardProps } from 'reka-ui';
import { ChevronRightIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<MenubarSubTriggerProps & {
  /** Adds left padding so the text lines up with items that have an icon or indicator. */
  inset?: boolean;
}>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <MenubarSubTrigger
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    :class="cn(
      'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden focus:bg-secondary focus:text-secondary-foreground data-[state=open]:bg-secondary data-[state=open]:text-secondary-foreground',
      inset && 'pl-8',
      $attrs.class ?? '',
    )"
    data-slot="menubar-sub-trigger"
  >
    <slot />
    <ChevronRightIcon class="ml-auto h-4 w-4" />
  </MenubarSubTrigger>
</template>
