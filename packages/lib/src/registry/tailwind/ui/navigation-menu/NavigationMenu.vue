<script setup lang="ts">
import {
  NavigationMenuRoot,
  type NavigationMenuRootEmits,
  type NavigationMenuRootProps,
  useForwardPropsEmits,
} from 'reka-ui';
import NavigationMenuViewport from './NavigationMenuViewport.vue';
import { cn } from '@ui/utils';

const props = defineProps<NavigationMenuRootProps>();
const emits = defineEmits<NavigationMenuRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <NavigationMenuRoot
    v-bind="forwarded"
    :class="cn('relative z-10 flex max-w-max flex-1 items-center justify-center', $attrs.class ?? '')"
  >
    <slot />
    <NavigationMenuViewport />
  </NavigationMenuRoot>
</template>
