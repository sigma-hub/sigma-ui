<script setup lang="ts">
import { useAttrs } from 'vue';

import { useCarousel } from './useCarousel';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const { orientation } = useCarousel();
</script>

<template>
  <div
    data-slot="carousel-item"
    v-bind="delegatedAttrs()"
    role="group"
    aria-roledescription="slide"
    :class="cn(
      'min-w-0 shrink-0 grow-0 basis-full',
      orientation === 'horizontal' ? 'pl-4' : 'pt-4',
      $attrs.class ?? '',
    )"
  >
    <slot />
  </div>
</template>
