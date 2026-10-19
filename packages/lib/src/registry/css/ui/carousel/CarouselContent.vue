<script setup lang="ts">
import { type ComponentPublicInstance, useAttrs } from 'vue';

import { useCarousel } from './useCarousel';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const { carouselRef, orientation } = useCarousel();

function setCarouselElement(element: Element | ComponentPublicInstance | null) {
  carouselRef.value = element instanceof HTMLElement ? element : undefined;
}
</script>

<template>
  <div
    :ref="setCarouselElement"
    class="sigma-ui-carousel-content"
    data-slot="carousel-content"
  >
    <div
      class="sigma-ui-carousel-content__wrapper"
      :class="[
        orientation === 'horizontal' ? 'sigma-ui-carousel-content__wrapper--horizontal' : 'sigma-ui-carousel-content__wrapper--vertical',
        $attrs.class ?? '',
      ]"
      v-bind="delegatedAttrs()"
    >
      <slot />
    </div>
  </div>
</template>

<style>
@layer components {
  .sigma-ui-carousel-content {
    overflow: hidden;
  }

  .sigma-ui-carousel-content__wrapper {
    display: flex;
  }

  .sigma-ui-carousel-content__wrapper--horizontal {
    margin-left: calc(var(--spacing) * -4);
  }

  .sigma-ui-carousel-content__wrapper--vertical {
    flex-direction: column;
    margin-top: calc(var(--spacing) * -4);
  }
}
</style>
