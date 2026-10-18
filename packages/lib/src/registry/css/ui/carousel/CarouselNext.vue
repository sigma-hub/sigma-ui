<script setup lang="ts">
import { useAttrs } from 'vue';

import { ArrowRightIcon } from 'lucide-vue-next';
import { useCarousel } from './useCarousel';
import { Button } from '@ui/registry/css/ui/button';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(defineProps<{
  label?: string;
}>(), {
  label: 'Next Slide',
});

const { orientation, canScrollNext, scrollNext } = useCarousel();
</script>

<template>
  <Button
    data-slot="carousel-next"
    v-bind="delegatedAttrs()"
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
      <span class="sigma-ui-sr-only">{{ props.label }}</span>
    </slot>
  </Button>
</template>

<style>
.sigma-ui-carousel-next {
  position: absolute;
  width: calc(var(--spacing) * 8);
  height: calc(var(--spacing) * 8);
  padding: 0;
  border-radius: var(--radius);
  touch-action: manipulation;
}

.sigma-ui-carousel-next--horizontal {
  top: 50%;
  right: calc(var(--spacing) * -12);
  transform: translateY(-50%);
}

.sigma-ui-carousel-next--vertical {
  bottom: calc(var(--spacing) * -12);
  left: 50%;
  transform: translateX(-50%) rotate(90deg);
}

.sigma-ui-carousel-next__icon {
  width: calc(var(--spacing) * 4);
  height: calc(var(--spacing) * 4);
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
