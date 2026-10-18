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
  margin-left: calc(var(--spacing) * -1);
}

.example-sigma-ui-carousel-spacing__slide {
  padding-left: calc(var(--spacing) * 1);
}

@media (width >= 48rem) {
  .example-sigma-ui-carousel-spacing__slide {
    flex-basis: 50%;
  }
}

@media (width >= 64rem) {
  .example-sigma-ui-carousel-spacing__slide {
    flex-basis: 33%;
  }
}

.example-sigma-ui-carousel-spacing__wrapper {
  padding: calc(var(--spacing) * 4);
}

.example-sigma-ui-carousel-spacing__item {
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
</style>
