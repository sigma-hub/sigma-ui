<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { NavigationMenuList, type NavigationMenuListProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<NavigationMenuListProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <NavigationMenuList
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    :class="
      cn(
        'group flex flex-1 list-none items-center justify-center gap-x-1',
        $attrs.class ?? '',
      )
    "
    data-slot="navigation-menu-list"
  >
    <slot />
  </NavigationMenuList>
</template>
