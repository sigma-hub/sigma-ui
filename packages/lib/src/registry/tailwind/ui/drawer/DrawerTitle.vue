<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import type { DrawerTitleProps } from 'reka-ui';
import { DrawerTitle } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<DrawerTitleProps>();
</script>

<template>
  <DrawerTitle
    v-bind="{ ...props, ...delegatedAttrs }"
    data-slot="drawer-title"
    :class="cn('text-lg font-semibold leading-none tracking-tight', $attrs.class ?? '')"
  >
    <slot />
  </DrawerTitle>
</template>
