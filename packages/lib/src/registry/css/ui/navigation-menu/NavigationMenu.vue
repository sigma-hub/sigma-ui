<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import {
  NavigationMenuRoot,
  type NavigationMenuRootEmits,
  type NavigationMenuRootProps,
  useForwardPropsEmits,
} from 'reka-ui';
import NavigationMenuViewport from './NavigationMenuViewport.vue';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<NavigationMenuRootProps>();
const emits = defineEmits<NavigationMenuRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <NavigationMenuRoot
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    class="sigma-ui-navigation-menu"
    data-slot="navigation-menu"
    :class="[$attrs.class]"
  >
    <slot />
    <NavigationMenuViewport />
  </NavigationMenuRoot>
</template>

<style>
.sigma-ui-navigation-menu {
  position: relative;
  z-index: 10;
  display: flex;
  max-width: max-content;
  flex: 1;
  align-items: center;
  justify-content: center;
}
</style>
