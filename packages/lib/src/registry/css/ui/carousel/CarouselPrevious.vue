<script setup lang="ts">
import { useAttrs } from 'vue';

import { ArrowLeftIcon } from '@lucide/vue';
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
  label: 'Previous Slide',
});

const { orientation, canScrollPrev, scrollPrev } = useCarousel();
</script>

<template>
  <Button
    data-slot="carousel-previous"
    v-bind="delegatedAttrs()"
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
      <span class="sigma-ui-sr-only">{{ props.label }}</span>
    </slot>
  </Button>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-carousel-previous {
    position: absolute;
    width: calc(var(--spacing) * 8);
    height: calc(var(--spacing) * 8);
    padding: 0;
    border-radius: var(--radius);
    touch-action: manipulation;
  }

  .sigma-ui-carousel-previous--horizontal {
    top: 50%;
    left: calc(var(--spacing) * -12);
    transform: translateY(-50%);
  }

  .sigma-ui-carousel-previous--vertical {
    top: calc(var(--spacing) * -12);
    left: 50%;
    transform: translateX(-50%) rotate(90deg);
  }

  .sigma-ui-carousel-previous__icon {
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
}
</style>
