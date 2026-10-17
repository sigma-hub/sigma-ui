<script setup lang="ts">
import { useAttrs } from 'vue';

import { MenubarSeparator, type MenubarSeparatorProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<MenubarSeparatorProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <MenubarSeparator
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class=" cn('-mx-1 my-1 h-px bg-muted', $attrs.class ?? '')"
    data-slot="menubar-separator"
  />
</template>
