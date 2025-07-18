<script setup lang="ts">
import { ref } from 'vue';
import { watchOnce } from '@vueuse/core';
import type { CarouselApi } from '@ui/registry/css/ui/carousel';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@ui/registry/css/ui/carousel';

const api = ref<CarouselApi>();
const totalCount = ref(0);
const current = ref(0);

function setApi(val: CarouselApi) {
  api.value = val;
}

watchOnce(api, (api) => {
  if (!api) {
    return;
  }

  totalCount.value = api.scrollSnapList().length;
  current.value = api.selectedScrollSnap() + 1;

  api.on('select', () => {
    current.value = api.selectedScrollSnap() + 1;
  });
});
</script>

<template>
  <div class="example-sigma-ui-carousel-api">
    <Carousel
      class="example-sigma-ui-carousel-api__carousel"
      @init-api="setApi"
    >
      <CarouselContent>
        <CarouselItem
          v-for="(_, index) in 5"
          :key="index"
        >
          <div class="example-sigma-ui-carousel-api__slide">
            <div class="example-sigma-ui-carousel-api__item">
              {{ index + 1 }}
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    <div class="example-sigma-ui-carousel-api__counter">
      Slide {{ current }} of {{ totalCount }}
    </div>
  </div>
</template>

<style>
.example-sigma-ui-carousel-api {
  width: 100%;
}

@media (width >= 640px) {
  .example-sigma-ui-carousel-api {
    width: auto;
  }
}

.example-sigma-ui-carousel-api__carousel {
  position: relative;
  width: 100%;
  max-width: 20rem;
}

.example-sigma-ui-carousel-api__slide {
  padding: 0.25rem;
}

.example-sigma-ui-carousel-api__item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  aspect-ratio: 1;
  font-size: 2.25rem;
  font-weight: 600;
  user-select: none;
}

.example-sigma-ui-carousel-api__counter {
  padding-top: 0.5rem;
  color: hsl(var(--muted-foreground));
  font-size: 0.875rem;
  text-align: center;
}
</style>
