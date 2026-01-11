<script setup lang="ts">
import { TabsContent, type TabsContentProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<TabsContentProps>();
</script>

<template>
  <TabsContent
    :class="cn('mt-2 focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2', $attrs.class ?? '')"
    v-bind="props"
  >
    <slot />
  </TabsContent>
</template>
