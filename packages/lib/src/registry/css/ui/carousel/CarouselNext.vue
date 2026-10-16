<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { ArrowRightIcon } from 'lucide-vue-next';
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
  label: 'Next Slide',
});

const { orientation, canScrollNext, scrollNext } = useCarousel();
</script>

<template>
  <Button
    v-bind="delegatedAttrs"
    :disabled="!canScrollNext"
    class="sigma-ui-carousel-next"
    :class="[
      orientation === 'horizontal' ? 'sigma-ui-carousel-next--horizontal' : 'sigma-ui-carousel-next--vertical',
      $attrs.class ?? '',
    ]"
    variant="outline"
    data-slot="carousel-next"
    @click="scrollNext"
  >
    <slot>
      <ArrowRightIcon class="sigma-ui-carousel-next__icon" />
      <span class="sigma-ui-sr-only">{{ props.label }}</span>
    </slot>
  </Button>
</template>

<style>
.sigma-ui-carousel-next {
  position: absolute;
  width: 2rem;
  height: 2rem;
  padding: 0;
  border-radius: var(--radius);
  touch-action: manipulation;
}

.sigma-ui-carousel-next--horizontal {
  top: 50%;
  right: -3rem;
  transform: translateY(-50%);
}

.sigma-ui-carousel-next--vertical {
  bottom: -3rem;
  left: 50%;
  transform: translateX(-50%) rotate(90deg);
}

.sigma-ui-carousel-next__icon {
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
