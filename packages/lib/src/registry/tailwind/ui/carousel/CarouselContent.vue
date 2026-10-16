<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { useCarousel } from './useCarousel';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const { carouselRef, orientation } = useCarousel();
</script>

<template>
  <div
    ref="carouselRef"
    class="overflow-hidden"
    data-slot="carousel-content"
  >
    <div
      :class="
        cn(
          'flex',
          orientation === 'horizontal' ? '-ml-4' : '-mt-4 flex-col',
          $attrs.class ?? '',
        )"
      v-bind="delegatedAttrs"
    >
      <slot />
    </div>
  </div>
</template>
