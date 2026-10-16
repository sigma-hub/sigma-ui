<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import {
  NavigationMenuTrigger,
  type NavigationMenuTriggerProps,
  useForwardProps,
} from 'reka-ui';
import { ChevronDownIcon } from 'lucide-vue-next';
import { navigationMenuTriggerStyle } from '.';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<NavigationMenuTriggerProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <NavigationMenuTrigger
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    :class="cn(navigationMenuTriggerStyle(), 'group', $attrs.class ?? '')"
    data-slot="navigation-menu-trigger"
  >
    <slot />
    <ChevronDownIcon
      class="relative top-px ml-1 h-3 w-3 transition duration-200 group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuTrigger>
</template>
