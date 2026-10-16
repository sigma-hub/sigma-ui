<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { ArrowLeftIcon } from 'lucide-vue-next';
import { useCarousel } from './useCarousel';
import { cn } from '@ui/utils';
import { Button } from '@ui/registry/tailwind/ui/button';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = withDefaults(defineProps<{
  label?: string;
}>(), {
  label: 'Previous Slide',
});

const { orientation, canScrollPrev, scrollPrev } = useCarousel();
</script>

<template>
  <Button
    v-bind="delegatedAttrs"
    :disabled="!canScrollPrev"
    :class="cn(
      'touch-manipulation absolute h-8 w-8 rounded p-0',
      orientation === 'horizontal'
        ? '-left-12 top-1/2 -translate-y-1/2'
        : '-top-12 left-1/2 -translate-x-1/2 rotate-90',
      $attrs.class ?? '',
    )"
    variant="outline"
    data-slot="carousel-previous"
    @click="scrollPrev"
  >
    <slot>
      <ArrowLeftIcon class="h-4 w-4 text-current" />
      <span class="sr-only">{{ props.label }}</span>
    </slot>
  </Button>
</template>
