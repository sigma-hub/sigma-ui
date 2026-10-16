<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { TabsList, type TabsListProps } from 'reka-ui';
import { cn } from '@ui/utils';
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
    :class="cn(
      'flex items-center justify-center w-[fit-content] h-10 p-[2px] rounded-md bg-muted text-muted-foreground',
      $attrs.class ?? '',
    )"
    data-slot="tabs-list"
  >
    <slot />
  </TabsList>
</template>
