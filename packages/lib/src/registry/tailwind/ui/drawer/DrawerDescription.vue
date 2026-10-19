<script lang="ts" setup>
import { useAttrs } from 'vue';

import type { DrawerDescriptionProps } from 'reka-ui';
import { DrawerDescription } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<DrawerDescriptionProps>();
</script>

<template>
  <DrawerDescription
    data-slot="drawer-description"
    v-bind="{ ...props, ...delegatedAttrs() }"
    :class="cn('text-sm text-muted-foreground', $attrs.class ?? '')"
  >
    <slot />
  </DrawerDescription>
</template>
