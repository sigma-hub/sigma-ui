<script setup lang="ts">
import { TabsContent, type TabsContentProps } from 'reka-ui';

const props = defineProps<TabsContentProps>();
</script>

<template>
  <TabsContent
    v-bind="props"
    class="sigma-ui-tabs-content"
  >
    <slot />
  </TabsContent>
</template>

<style>
.sigma-ui-tabs-content {
  margin-top: 0.5rem;
}

.sigma-ui-tabs-content:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--ring)), 0 0 0 4px hsl(var(--background));
}
</style>
