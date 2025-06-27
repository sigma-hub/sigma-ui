<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@ui/registry/css/ui/carousel';
</script>

<template>
  <Carousel
    class="example-sigma-ui-carousel-size"
    :opts="{
      align: 'start',
    }"
  >
    <CarouselContent>
      <CarouselItem
        v-for="(_, index) in 5"
        :key="index"
        class="example-sigma-ui-carousel-size__slide"
      >
        <div class="example-sigma-ui-carousel-size__wrapper">
          <div class="example-sigma-ui-carousel-size__item">
            {{ index + 1 }}
          </div>
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>

<style>
.example-sigma-ui-carousel-size {
  position: relative;
  width: 100%;
  max-width: 24rem;
}

@media (min-width: 768px) {
  .example-sigma-ui-carousel-size__slide {
    flex-basis: 50%;
  }
}

@media (min-width: 1024px) {
  .example-sigma-ui-carousel-size__slide {
    flex-basis: 33%;
  }
}

.example-sigma-ui-carousel-size__wrapper {
  padding: 0.25rem;
}

.example-sigma-ui-carousel-size__item {
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1;
  padding: 1.5rem;
  border-radius: var(--radius);
  border: 1px solid hsl(var(--border));
  font-size: 2.25rem;
  font-weight: 600;
  user-select: none;
}
</style>
