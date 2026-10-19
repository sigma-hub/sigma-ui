<script setup lang="ts">
import { useAttrs } from 'vue';

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

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<NavigationMenuRootProps>();
const emits = defineEmits<NavigationMenuRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <NavigationMenuRoot
    data-slot="navigation-menu"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-navigation-menu"
    :class="[$attrs.class]"
  >
    <slot />
    <NavigationMenuViewport />
  </NavigationMenuRoot>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-navigation-menu {
    position: relative;
    z-index: 10;
    display: flex;
    max-width: max-content;
    flex: 1;
    align-items: center;
    justify-content: center;
  }
}
</style>
