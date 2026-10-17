<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  NavigationMenuRoot,
  type NavigationMenuRootEmits,
  type NavigationMenuRootProps,
  useForwardPropsEmits,
} from 'reka-ui';
import NavigationMenuViewport from './NavigationMenuViewport.vue';
import { cn } from '@ui/utils';
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
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn('relative z-10 flex max-w-max flex-1 items-center justify-center', $attrs.class ?? '')"
    data-slot="navigation-menu"
  >
    <slot />
    <NavigationMenuViewport />
  </NavigationMenuRoot>
</template>
