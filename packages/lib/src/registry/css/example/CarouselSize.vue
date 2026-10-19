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
@layer components {
  .example-sigma-ui-carousel-size {
    position: relative;
    width: 100%;
    max-width: 24rem;
  }

  @media (width >= 48rem) {
    .example-sigma-ui-carousel-size__slide {
      flex-basis: 50%;
    }
  }

  @media (width >= 64rem) {
    .example-sigma-ui-carousel-size__slide {
      flex-basis: 33%;
    }
  }

  .example-sigma-ui-carousel-size__wrapper {
    padding: calc(var(--spacing) * 1);
  }

  .example-sigma-ui-carousel-size__item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: calc(var(--spacing) * 6);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    aspect-ratio: 1;
    font-size: 2.25rem;
    font-weight: 600;
    user-select: none;
  }
}
</style>
