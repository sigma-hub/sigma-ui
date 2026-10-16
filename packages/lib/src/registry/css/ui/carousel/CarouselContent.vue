<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { useCarousel } from './useCarousel';

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
    class="sigma-ui-carousel-content"
    data-slot="carousel-content"
  >
    <div
      class="sigma-ui-carousel-content__wrapper"
      :class="[
        orientation === 'horizontal' ? 'sigma-ui-carousel-content__wrapper--horizontal' : 'sigma-ui-carousel-content__wrapper--vertical',
        $attrs.class ?? '',
      ]"
      v-bind="delegatedAttrs"
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
  flex-direction: column;
  margin-top: -1rem;
}
</style>
