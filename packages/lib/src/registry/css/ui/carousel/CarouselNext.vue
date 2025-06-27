<script setup lang="ts">
import { ArrowRightIcon } from 'lucide-vue-next';
import { useCarousel } from './useCarousel';
import { Button } from '@ui/registry/css/ui/button';

const { orientation, canScrollNext, scrollNext } = useCarousel();
</script>

<template>
  <Button
    :disabled="!canScrollNext"
    class="sigma-ui-carousel-next"
    :class="[
      orientation === 'horizontal' ? 'sigma-ui-carousel-next--horizontal' : 'sigma-ui-carousel-next--vertical',
      $attrs.class ?? '',
    ]"
    variant="outline"
    @click="scrollNext"
  >
    <slot>
      <ArrowRightIcon class="sigma-ui-carousel-next__icon" />
      <span class="sr-only">Next Slide</span>
    </slot>
  </Button>
</template>

<style>
.sigma-ui-carousel-next {
  touch-action: manipulation;
  position: absolute;
  height: 2rem;
  width: 2rem;
  padding: 0;
  border-radius: var(--radius);
}

.sigma-ui-carousel-next--horizontal {
  right: -3rem;
  top: 50%;
  transform: translateY(-50%);
}

.sigma-ui-carousel-next--vertical {
  bottom: -3rem;
  left: 50%;
  transform: translateX(-50%) rotate(90deg);
}

.sigma-ui-carousel-next__icon {
  height: 1rem;
  width: 1rem;
}
</style>
