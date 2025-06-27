<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@ui/registry/css/ui/carousel';
</script>

<template>
  <Carousel
    class="example-sigma-ui-carousel-spacing"
    :opts="{
      align: 'start',
    }"
  >
    <CarouselContent class="example-sigma-ui-carousel-spacing__content">
      <CarouselItem
        v-for="(_, index) in 5"
        :key="index"
        class="example-sigma-ui-carousel-spacing__slide"
      >
        <div class="example-sigma-ui-carousel-spacing__wrapper">
          <div class="example-sigma-ui-carousel-spacing__item">
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
.example-sigma-ui-carousel-spacing {
  position: relative;
  width: 100%;
  max-width: 24rem;
}

.example-sigma-ui-carousel-spacing__content {
  margin-left: -0.25rem;
}

.example-sigma-ui-carousel-spacing__slide {
  padding-left: 0.25rem;
}

@media (min-width: 768px) {
  .example-sigma-ui-carousel-spacing__slide {
    flex-basis: 50%;
  }
}

@media (min-width: 1024px) {
  .example-sigma-ui-carousel-spacing__slide {
    flex-basis: 33%;
  }
}

.example-sigma-ui-carousel-spacing__wrapper {
  padding: 1rem;
}

.example-sigma-ui-carousel-spacing__item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border-radius: var(--radius);
  border: 1px solid hsl(var(--border));
  font-size: 2.25rem;
  line-height: 1.1;
  font-weight: 600;
  user-select: none;
}
</style>
