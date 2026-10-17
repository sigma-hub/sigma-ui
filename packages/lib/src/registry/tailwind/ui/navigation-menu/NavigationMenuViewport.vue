<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  NavigationMenuViewport,
  type NavigationMenuViewportProps,
  useForwardProps,
} from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<NavigationMenuViewportProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <div class="absolute left-0 top-full flex justify-center">
    <NavigationMenuViewport
      v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
      :class="
        cn(
          'origin-top-center relative mt-1.5 h-(--reka-navigation-menu-viewport-height) w-full overflow-hidden rounded-md border bg-popover backdrop-blur-(--backdrop-filter-blur) text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-(--reka-navigation-menu-viewport-width)',
          $attrs.class ?? '',
        )
      "
      data-slot="navigation-menu-viewport"
    />
  </div>
</template>
