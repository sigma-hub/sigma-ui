<script setup lang="ts">
import { TabsList, type TabsListProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<TabsListProps>();
</script>

<template>
  <TabsList
    v-bind="props"
    :class="cn(
      'flex items-center justify-center w-[fit-content] h-10 p-[2px] rounded-md bg-muted text-muted-foreground',
      $attrs.class ?? '',
    )"
  >
    <slot />
  </TabsList>
</template>
