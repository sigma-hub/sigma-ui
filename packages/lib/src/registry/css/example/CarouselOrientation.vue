<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@ui/registry/css/ui/carousel';
</script>

<template>
  <Carousel
    orientation="vertical"
    class="example-sigma-ui-carousel-orientation"
    :opts="{
      align: 'start',
    }"
  >
    <CarouselContent class="example-sigma-ui-carousel-orientation__content">
      <CarouselItem
        v-for="(_, index) in 5"
        :key="index"
        class="example-sigma-ui-carousel-orientation__slide"
      >
        <div class="example-sigma-ui-carousel-orientation__item">
          {{ index + 1 }}
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>

<style>
@layer components {
  .example-sigma-ui-carousel-orientation {
    position: relative;
    width: 100%;
    max-width: 20rem;
  }

  .example-sigma-ui-carousel-orientation__content {
    height: 200px;
    margin-top: calc(var(--spacing) * -1);
  }

  .example-sigma-ui-carousel-orientation__slide {
    padding: calc(var(--spacing) * 1);
  }

  @media (width >= 48rem) {
    .example-sigma-ui-carousel-orientation__slide {
      flex-basis: 50%;
    }
  }

  .example-sigma-ui-carousel-orientation__item {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: calc(var(--spacing) * 6);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    font-size: 2.25rem;
    font-weight: 600;
    line-height: 1.1;
    user-select: none;
  }
}
</style>
