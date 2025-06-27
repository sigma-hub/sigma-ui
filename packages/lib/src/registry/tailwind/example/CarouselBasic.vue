<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@ui/registry/tailwind/ui/carousel';
</script>

<template>
  <Carousel class="relative w-full max-w-xs">
    <CarouselContent>
      <CarouselItem
        v-for="(_, index) in 5"
        :key="index"
      >
        <div class="flex aspect-square items-center justify-center p-6 border rounded-lg text-4xl font-semibold select-none">
          {{ index + 1 }}
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>
