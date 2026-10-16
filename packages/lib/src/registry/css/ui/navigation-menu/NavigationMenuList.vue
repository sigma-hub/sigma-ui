<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { NavigationMenuList, type NavigationMenuListProps, useForwardProps } from 'reka-ui';
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
    class="sigma-ui-navigation-menu-list"
    data-slot="navigation-menu-list"
    :class="[$attrs.class]"
  >
    <slot />
  </NavigationMenuList>
</template>

<style>
.sigma-ui-navigation-menu-list {
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
  list-style: none;
}
</style>
