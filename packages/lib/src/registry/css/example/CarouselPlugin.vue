<script setup lang="ts">
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@ui/registry/css/ui/carousel';

const plugin = Autoplay({
  delay: 2000,
  stopOnMouseEnter: true,
  stopOnInteraction: false,
});
</script>

<template>
  <Carousel
    class="example-sigma-ui-carousel-plugin"
    :plugins="[plugin]"
    @mouseenter="plugin.stop"
    @mouseleave="[plugin.reset(), plugin.play()];"
  >
    <CarouselContent>
      <CarouselItem
        v-for="(_, index) in 5"
        :key="index"
      >
        <div class="example-sigma-ui-carousel-plugin__slide">
          <div class="example-sigma-ui-carousel-plugin__item">
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
.example-sigma-ui-carousel-plugin {
  position: relative;
  width: 100%;
  max-width: 20rem;
}

.example-sigma-ui-carousel-plugin__slide {
  padding: calc(var(--spacing) * 1);
}

.example-sigma-ui-carousel-plugin__content {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: calc(var(--spacing) * 6);
  aspect-ratio: 1;
}

.example-sigma-ui-carousel-plugin__number {
  font-size: 2.25rem;
  font-weight: 600;
}

.example-sigma-ui-carousel-plugin__item {
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
