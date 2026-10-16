<script setup lang="ts">
import { NavigationMenuItem, type NavigationMenuItemProps } from 'reka-ui';

const props = defineProps<NavigationMenuItemProps>();
</script>

<template>
  <NavigationMenuItem
    v-bind="props"
    data-slot="navigation-menu-item"
  >
    <slot />
  </NavigationMenuItem>
</template>
