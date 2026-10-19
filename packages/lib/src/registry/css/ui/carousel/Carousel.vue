<script setup lang="ts">
import { useAttrs } from 'vue';

import { useProvideCarousel } from './useCarousel';
import type { CarouselEmits, CarouselProps } from './interface';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(defineProps<CarouselProps>(), {
  orientation: 'horizontal',
});

const emits = defineEmits<CarouselEmits>();

const carouselArgs = useProvideCarousel(props, emits);

defineExpose(carouselArgs);

function onKeyDown(event: KeyboardEvent) {
  const prevKey = props.orientation === 'vertical' ? 'ArrowUp' : 'ArrowLeft';
  const nextKey = props.orientation === 'vertical' ? 'ArrowDown' : 'ArrowRight';

  if (event.key === prevKey) {
    event.preventDefault();
    carouselArgs.scrollPrev();

    return;
  }

  if (event.key === nextKey) {
    event.preventDefault();
    carouselArgs.scrollNext();
  }
}
</script>

<template>
  <div
    data-slot="carousel"
    v-bind="delegatedAttrs()"
    class="sigma-ui-carousel"
    :class="[$attrs.class]"
    role="region"
    aria-roledescription="carousel"
    tabindex="0"
    @keydown="onKeyDown"
  >
    <slot v-bind="carouselArgs" />
  </div>
</template>

<style>
@layer components {
  .sigma-ui-carousel {
    position: relative;
  }
}
</style>
