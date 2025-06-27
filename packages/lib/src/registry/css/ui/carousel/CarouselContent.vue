<script setup lang="ts">
import { useCarousel } from './useCarousel';

defineOptions({
  inheritAttrs: false,
});

const { carouselRef, orientation } = useCarousel();
</script>

<template>
  <div
    ref="carouselRef"
    class="sigma-ui-carousel-content"
  >
    <div
      class="sigma-ui-carousel-content__wrapper"
      :class="[
        orientation === 'horizontal' ? 'sigma-ui-carousel-content__wrapper--horizontal' : 'sigma-ui-carousel-content__wrapper--vertical',
        $attrs.class ?? '',
      ]"
      v-bind="$attrs"
    >
      <slot />
    </div>
  </div>
</template>

<style>
.sigma-ui-carousel-content {
  overflow: hidden;
}

.sigma-ui-carousel-content__wrapper {
  display: flex;
}

.sigma-ui-carousel-content__wrapper--horizontal {
  margin-left: -1rem;
}

.sigma-ui-carousel-content__wrapper--vertical {
  margin-top: -1rem;
  flex-direction: column;
}
</style>
