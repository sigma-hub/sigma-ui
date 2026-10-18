<script setup lang="ts">
import { useAttrs } from 'vue';

import { useCarousel } from './useCarousel';
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
    class="sigma-ui-carousel-item"
    :class="[
      orientation === 'horizontal' ? 'sigma-ui-carousel-item--horizontal' : 'sigma-ui-carousel-item--vertical',
      $attrs.class ?? '',
    ]"
    role="group"
    aria-roledescription="slide"
  >
    <slot />
  </div>
</template>

<style>
.sigma-ui-carousel-item {
  min-width: 0;
  flex-basis: 100%;
  flex-shrink: 0;
}

.sigma-ui-carousel-item--horizontal {
  padding-left: calc(var(--spacing) * 4);
}

.sigma-ui-carousel-item--vertical {
  padding-top: calc(var(--spacing) * 4);
}
</style>
