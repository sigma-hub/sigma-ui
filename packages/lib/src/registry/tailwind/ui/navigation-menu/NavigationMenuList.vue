<script setup lang="ts">
import { useAttrs } from 'vue';

import { NavigationMenuList, type NavigationMenuListProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<NavigationMenuListProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <NavigationMenuList
    data-slot="navigation-menu-list"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
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
