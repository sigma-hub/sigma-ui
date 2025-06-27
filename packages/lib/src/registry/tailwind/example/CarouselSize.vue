<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@ui/registry/tailwind/ui/carousel';
</script>

<template>
  <Carousel
    class="relative w-full max-w-sm"
    :opts="{
      align: 'start',
    }"
  >
    <CarouselContent>
      <CarouselItem
        v-for="(_, index) in 5"
        :key="index"
        class="md:basis-1/2 lg:basis-1/3"
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
