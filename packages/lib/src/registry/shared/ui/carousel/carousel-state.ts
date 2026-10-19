import { createInjectionState } from '@vueuse/core';
import emblaCarouselVue from 'embla-carousel-vue';
import { onMounted, ref } from 'vue';
import type { CarouselProps, UnwrapRefCarouselApi as CarouselApi } from './carousel-props';

const [useProvideCarousel, useInjectCarousel] = createInjectionState(
  ({
    opts,
    orientation,
    plugins,
  }: CarouselProps, emits: (event: 'init-api', payload: CarouselApi) => void) => {
    const [emblaNode, emblaApi] = emblaCarouselVue({
      ...opts,
      axis: orientation === 'horizontal' ? 'x' : 'y',
    }, plugins);

    function scrollPrev() {
      emblaApi.value?.scrollPrev();
    }

    function scrollNext() {
      emblaApi.value?.scrollNext();
    }

    const canScrollNext = ref(false);
    const canScrollPrev = ref(false);

    function onSelect(api: CarouselApi) {
      canScrollNext.value = api?.canScrollNext() || false;
      canScrollPrev.value = api?.canScrollPrev() || false;
    }

    onMounted(() => {
      if (!emblaApi.value) {
        return;
      }

      emblaApi.value?.on('init', onSelect);
      emblaApi.value?.on('reInit', onSelect);
      emblaApi.value?.on('select', onSelect);

      emits('init-api', emblaApi.value);
    });

    return {
      /** Template ref of the Embla viewport element. */
      carouselRef: emblaNode,
      /** Embla Carousel API instance, available after mount. */
      carouselApi: emblaApi,
      /** Whether the carousel can scroll to a previous slide. */
      canScrollPrev,
      /** Whether the carousel can scroll to a next slide. */
      canScrollNext,
      /** Scrolls to the previous slide. */
      scrollPrev,
      /** Scrolls to the next slide. */
      scrollNext,
      orientation,
    };
  },
);

function useCarousel() {
  const carouselState = useInjectCarousel();

  if (!carouselState) {
    throw new Error('useCarousel must be used within a <Carousel />');
  }

  return carouselState;
}

export { useCarousel, useProvideCarousel };
