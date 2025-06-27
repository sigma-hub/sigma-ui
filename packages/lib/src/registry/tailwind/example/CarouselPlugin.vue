<script setup lang="ts">
import Autoplay from 'embla-carousel-autoplay';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@ui/registry/tailwind/ui/carousel';

const plugin = Autoplay({
  delay: 2000,
  stopOnMouseEnter: true,
  stopOnInteraction: false,
});
</script>

<template>
  <Carousel
    class="relative w-full max-w-xs"
    :plugins="[plugin]"
    @mouseenter="plugin.stop"
    @mouseleave="[plugin.reset(), plugin.play()];"
  >
    <CarouselContent>
      <CarouselItem
        v-for="(_, index) in 5"
        :key="index"
      >
        <div class="p-1">
          <div class="flex aspect-square items-center justify-center p-6 border rounded-lg text-4xl font-semibold select-none">
            {{ index + 1 }}
          </div>
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>
