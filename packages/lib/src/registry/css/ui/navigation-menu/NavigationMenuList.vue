<script setup lang="ts">
import { useAttrs } from 'vue';

import { NavigationMenuList, type NavigationMenuListProps, useForwardProps } from 'reka-ui';
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
    class="sigma-ui-navigation-menu-list"
    :class="[$attrs.class]"
  >
    <slot />
  </NavigationMenuList>
</template>

<style>
@layer components {
  .sigma-ui-navigation-menu-list {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
    gap: calc(var(--spacing) * 1);
    list-style: none;
  }
}
</style>
