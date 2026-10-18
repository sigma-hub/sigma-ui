<script setup lang="ts">
import { useAttrs } from 'vue';

import { TabsList, type TabsListProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<TabsListProps>();
</script>

<template>
  <TabsList
    data-slot="tabs-list"
    v-bind="{ ...props, ...delegatedAttrs() }"
    class="sigma-ui-tabs-list"
    :class="[$attrs.class]"
  >
    <slot />
  </TabsList>
</template>

<style>
.sigma-ui-tabs-list {
  display: inline-flex;
  height: calc(var(--spacing) * 10);
  align-items: center;
  justify-content: center;
  padding: 2px;
  border-radius: var(--radius-md);
  background-color: var(--muted);
  color: var(--muted-foreground);
}
</style>
