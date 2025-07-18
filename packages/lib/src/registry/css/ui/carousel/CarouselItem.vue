<script setup lang="ts">
import { useCarousel } from './useCarousel';

const { orientation } = useCarousel();
</script>

<template>
  <div
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
  padding-left: 1rem;
}

.sigma-ui-carousel-item--vertical {
  padding-top: 1rem;
}
</style>
