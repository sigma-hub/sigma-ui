<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { TabsList, type TabsListProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<TabsListProps>();
</script>

<template>
  <TabsList
    v-bind="{ ...props, ...delegatedAttrs }"
    class="sigma-ui-tabs-list"
    data-slot="tabs-list"
    :class="[$attrs.class]"
  >
    <slot />
  </TabsList>
</template>

<style>
.sigma-ui-tabs-list {
  display: inline-flex;
  height: 2.5rem;
  align-items: center;
  justify-content: center;
  padding: 2px;
  border-radius: var(--radius-md);
  background-color: var(--muted);
  color: var(--muted-foreground);
}
</style>
