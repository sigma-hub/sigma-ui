<script setup lang="ts">
import { useProvideCarousel } from './useCarousel';
import type { CarouselEmits, CarouselProps } from './interface';

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
.sigma-ui-carousel {
  position: relative;
}
</style>
