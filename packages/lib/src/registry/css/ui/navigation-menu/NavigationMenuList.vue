<script setup lang="ts">
import { NavigationMenuList, type NavigationMenuListProps, useForwardProps } from 'reka-ui';

const props = defineProps<NavigationMenuListProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <NavigationMenuList
    v-bind="forwardedProps"
    class="sigma-ui-navigation-menu-list"
  >
    <slot />
  </NavigationMenuList>
</template>

<style>
.sigma-ui-navigation-menu-list {
  display: flex;
  flex: 1;
  list-style: none;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}
</style>
