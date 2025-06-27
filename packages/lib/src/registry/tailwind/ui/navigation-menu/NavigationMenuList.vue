<script setup lang="ts">
import { NavigationMenuList, type NavigationMenuListProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<NavigationMenuListProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <NavigationMenuList
    v-bind="forwardedProps"
    :class="
      cn(
        'group flex flex-1 list-none items-center justify-center gap-x-1',
        $attrs.class ?? '',
      )
    "
  >
    <slot />
  </NavigationMenuList>
</template>
