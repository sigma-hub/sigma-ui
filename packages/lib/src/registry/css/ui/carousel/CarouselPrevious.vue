<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { ArrowLeftIcon } from 'lucide-vue-next';
import { useCarousel } from './useCarousel';
import { Button } from '@ui/registry/css/ui/button';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = withDefaults(defineProps<{
  label?: string;
}>(), {
  label: 'Previous Slide',
});

const { orientation, canScrollPrev, scrollPrev } = useCarousel();
</script>

<template>
  <Button
    v-bind="delegatedAttrs"
    :disabled="!canScrollPrev"
    class="sigma-ui-carousel-previous"
    :class="[
      orientation === 'horizontal' ? 'sigma-ui-carousel-previous--horizontal' : 'sigma-ui-carousel-previous--vertical',
      $attrs.class ?? '',
    ]"
    variant="outline"
    data-slot="carousel-previous"
    @click="scrollPrev"
  >
    <slot>
      <ArrowLeftIcon class="sigma-ui-carousel-previous__icon" />
      <span class="sigma-ui-sr-only">{{ props.label }}</span>
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

.sigma-ui-sr-only {
  position: absolute;
  overflow: hidden;
  width: 1px;
  height: 1px;
  padding: 0;
  border-width: 0;
  margin: -1px;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}
</style>
