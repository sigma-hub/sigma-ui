<script lang="ts" setup>
import { useAttrs } from 'vue';

import type { DrawerTitleProps } from 'reka-ui';
import { DrawerTitle } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<DrawerTitleProps>();
</script>

<template>
  <DrawerTitle
    data-slot="drawer-title"
    v-bind="{ ...props, ...delegatedAttrs() }"
    :class="cn('text-lg font-semibold leading-none tracking-tight', $attrs.class ?? '')"
  >
    <slot />
  </DrawerTitle>
</template>
