<script setup lang="ts">
import { ScrollAreaScrollbar, type ScrollAreaScrollbarProps, ScrollAreaThumb } from 'reka-ui';
import { cn } from '@ui/utils';

const props = withDefaults(defineProps<ScrollAreaScrollbarProps>(), {
  orientation: 'vertical',
});
</script>

<template>
  <ScrollAreaScrollbar
    v-bind="props"
    :class="
      cn('flex touch-none select-none transition-colors',
         orientation === 'vertical'
           && 'h-full w-2.5 border-l border-l-transparent p-px',
         orientation === 'horizontal'
           && 'h-2.5 flex-col border-t border-t-transparent p-px',
         $attrs.class ?? '')"
  >
    <ScrollAreaThumb class="relative flex-1 rounded-full bg-border" />
  </ScrollAreaScrollbar>
</template>
