<script setup lang="ts">
import {
  NavigationMenuRoot,
  type NavigationMenuRootEmits,
  type NavigationMenuRootProps,
  useForwardPropsEmits,
} from 'reka-ui';
import NavigationMenuViewport from './NavigationMenuViewport.vue';

const props = defineProps<NavigationMenuRootProps>();
const emits = defineEmits<NavigationMenuRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <NavigationMenuRoot
    v-bind="forwarded"
    class="sigma-ui-navigation-menu"
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
