<script setup lang="ts">
import { useAttrs } from 'vue';

import { TabsList, type TabsListProps } from 'reka-ui';
import { cn } from '@ui/utils';
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
    :class="cn(
      'flex items-center justify-center w-[fit-content] h-10 p-[2px] rounded-md bg-muted text-muted-foreground',
      $attrs.class ?? '',
    )"
  >
    <slot />
  </TabsList>
</template>
