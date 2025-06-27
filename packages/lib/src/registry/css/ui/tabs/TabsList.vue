<script setup lang="ts">
import { TabsList, type TabsListProps } from 'reka-ui';

const props = defineProps<TabsListProps>();
</script>

<template>
  <TabsList
    v-bind="props"
    class="sigma-ui-tabs-list"
  >
    <slot />
  </TabsList>
</template>

<style>
.sigma-ui-tabs-list {
  display: inline-flex;
  height: 2.5rem;
  padding: 2px;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  background-color: hsl(var(--muted));
  color: hsl(var(--muted-foreground));
}
</style>
