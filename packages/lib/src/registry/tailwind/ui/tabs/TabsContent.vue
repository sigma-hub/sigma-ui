<script setup lang="ts">
import { useAttrs } from 'vue';

import { TabsContent, type TabsContentProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<TabsContentProps>();
</script>

<template>
  <TabsContent
    data-slot="tabs-content"
    v-bind="{ ...props, ...delegatedAttrs() }"
    :class="cn('mt-2 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2', $attrs.class ?? '')"
  >
    <slot />
  </TabsContent>
</template>
