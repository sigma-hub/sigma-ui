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
.example-sigma-ui-carousel-orientation {
  position: relative;
  width: 100%;
  max-width: 20rem;
}

.example-sigma-ui-carousel-orientation__content {
  height: 200px;
  margin-top: -0.25rem;
}

.example-sigma-ui-carousel-orientation__slide {
  padding: 0.25rem;
}

@media (width >= 768px) {
  .example-sigma-ui-carousel-orientation__slide {
    flex-basis: 50%;
  }
}

.example-sigma-ui-carousel-orientation__item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  font-size: 2.25rem;
  font-weight: 600;
  line-height: 1.1;
  user-select: none;
}
</style>
