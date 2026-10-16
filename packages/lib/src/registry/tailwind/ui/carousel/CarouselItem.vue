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

const { orientation } = useCarousel();
</script>

<template>
  <div
    v-bind="delegatedAttrs"
    role="group"
    aria-roledescription="slide"
    :class="cn(
      'min-w-0 shrink-0 grow-0 basis-full',
      orientation === 'horizontal' ? 'pl-4' : 'pt-4',
      $attrs.class ?? '',
    )"
    data-slot="carousel-item"
  >
    <slot />
  </div>
</template>
