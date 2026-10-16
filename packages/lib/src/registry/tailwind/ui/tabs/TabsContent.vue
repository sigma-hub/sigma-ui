<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { TabsContent, type TabsContentProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<TabsContentProps>();
</script>

<template>
  <TabsContent
    v-bind="{ ...props, ...delegatedAttrs }"
    :class="cn('mt-2 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2', $attrs.class ?? '')"
    data-slot="tabs-content"
  >
    <slot />
  </TabsContent>
</template>
