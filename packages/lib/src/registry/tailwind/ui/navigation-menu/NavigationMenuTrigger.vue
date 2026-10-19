<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  NavigationMenuTrigger,
  type NavigationMenuTriggerProps,
  useForwardProps,
} from 'reka-ui';
import { ChevronDownIcon } from '@lucide/vue';
import { navigationMenuTriggerStyle } from '.';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<NavigationMenuTriggerProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <NavigationMenuTrigger
    data-slot="navigation-menu-trigger"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="cn(navigationMenuTriggerStyle(), 'group', $attrs.class ?? '')"
  >
    <slot />
    <ChevronDownIcon
      class="relative top-px ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuTrigger>
</template>
