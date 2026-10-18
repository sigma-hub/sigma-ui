<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@ui/registry/css/ui/carousel';
</script>

<template>
  <Carousel class="example-sigma-ui-carousel-basic">
    <CarouselContent>
      <CarouselItem
        v-for="(_, index) in 5"
        :key="index"
      >
        <div class="example-sigma-ui-carousel-basic__item">
          {{ index + 1 }}
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>

<style>
.example-sigma-ui-carousel-basic {
  position: relative;
  width: 100%;
  max-width: 20rem;
}

.example-sigma-ui-carousel-basic__item {
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
</style>
