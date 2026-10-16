<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import type { DrawerDescriptionProps } from 'reka-ui';
import { DrawerDescription } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<DrawerDescriptionProps>();
</script>

<template>
  <DrawerDescription
    v-bind="{ ...props, ...delegatedAttrs }"
    data-slot="drawer-description"
    :class="cn('text-sm text-muted-foreground', $attrs.class ?? '')"
  >
    <slot />
  </DrawerDescription>
</template>
