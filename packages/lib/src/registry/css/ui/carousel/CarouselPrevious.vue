<script setup lang="ts">
import { ArrowLeftIcon } from 'lucide-vue-next';
import { useCarousel } from './useCarousel';
import { Button } from '@ui/registry/css/ui/button';

const { orientation, canScrollPrev, scrollPrev } = useCarousel();
</script>

<template>
  <Button
    :disabled="!canScrollPrev"
    class="sigma-ui-carousel-previous"
    :class="[
      orientation === 'horizontal' ? 'sigma-ui-carousel-previous--horizontal' : 'sigma-ui-carousel-previous--vertical',
      $attrs.class ?? '',
    ]"
    variant="outline"
    @click="scrollPrev"
  >
    <slot>
      <ArrowLeftIcon class="sigma-ui-carousel-previous__icon" />
      <span class="sr-only">Previous Slide</span>
    </slot>
  </Button>
</template>

<style>
.sigma-ui-carousel-previous {
  position: absolute;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border-radius: var(--radius);
  touch-action: manipulation;
}

.sigma-ui-carousel-previous--horizontal {
  top: 50%;
  left: -3rem;
  transform: translateY(-50%);
}

.sigma-ui-carousel-previous--vertical {
  top: -3rem;
  left: 50%;
  transform: translateX(-50%) rotate(90deg);
}

.sigma-ui-carousel-previous__icon {
  width: 1rem;
  height: 1rem;
}
</style>
