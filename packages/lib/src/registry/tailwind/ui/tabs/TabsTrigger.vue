<script setup lang="ts">
import { useAttrs } from 'vue';

import { TabsTrigger, type TabsTriggerProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<TabsTriggerProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <TabsTrigger
    data-slot="tabs-trigger"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="cn(
      'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 h-full text-sm font-medium transition-all focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-input data-[state=active]:text-foreground data-[state=active]:shadow-sm',
      $attrs.class ?? '',
    )"
  >
    <slot />
  </TabsTrigger>
</template>
