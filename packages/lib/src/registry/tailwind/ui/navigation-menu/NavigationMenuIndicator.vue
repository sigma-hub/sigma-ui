<script setup lang="ts">
import { NavigationMenuIndicator, type NavigationMenuIndicatorProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<NavigationMenuIndicatorProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <NavigationMenuIndicator
    v-bind="forwardedProps"
    :class="cn('top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in', $attrs.class ?? '')"
  >
    <div class="relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
  </NavigationMenuIndicator>
</template>
