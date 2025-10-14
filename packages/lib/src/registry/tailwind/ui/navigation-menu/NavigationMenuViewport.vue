<script setup lang="ts">
import {
  NavigationMenuViewport,
  type NavigationMenuViewportProps,
  useForwardProps,
} from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<NavigationMenuViewportProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <div class="absolute left-0 top-full flex justify-center">
    <NavigationMenuViewport
      v-bind="forwardedProps"
      :class="
        cn(
          'origin-top-center relative mt-1.5 h-(--reka-navigation-menu-viewport-height) w-full overflow-hidden rounded-md border bg-popover backdrop-blur-(--backdrop-filter-blur) text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90 md:w-(--reka-navigation-menu-viewport-width)',
          $attrs.class ?? '',
        )
      "
    />
  </div>
</template>
