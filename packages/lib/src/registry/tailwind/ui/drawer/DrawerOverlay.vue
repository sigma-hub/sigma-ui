<script lang="ts" setup>
import { useAttrs } from 'vue';

import type { DrawerOverlayProps } from 'reka-ui';
import { DrawerOverlay } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<DrawerOverlayProps>();
</script>

<template>
  <DrawerOverlay
    data-slot="drawer-overlay"
    v-bind="{ ...props, ...delegatedAttrs() }"
    :class="cn('fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0', $attrs.class ?? '')"
  />
</template>
