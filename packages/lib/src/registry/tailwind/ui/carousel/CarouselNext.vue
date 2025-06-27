<script setup lang="ts">
import { ArrowRightIcon } from 'lucide-vue-next';
import { useCarousel } from './useCarousel';
import { cn } from '@ui/utils';
import { Button } from '@ui/registry/tailwind/ui/button';

const { orientation, canScrollNext, scrollNext } = useCarousel();
</script>

<template>
  <Button
    :disabled="!canScrollNext"
    :class="cn(
      'touch-manipulation absolute h-8 w-8 rounded p-0',
      orientation === 'horizontal'
        ? '-right-12 top-1/2 -translate-y-1/2'
        : '-bottom-12 left-1/2 -translate-x-1/2 rotate-90',
      $attrs.class ?? '',
    )"
    variant="outline"
    @click="scrollNext"
  >
    <slot>
      <ArrowRightIcon class="h-4 w-4 text-current" />
      <span class="sr-only">Next Slide</span>
    </slot>
  </Button>
</template>
