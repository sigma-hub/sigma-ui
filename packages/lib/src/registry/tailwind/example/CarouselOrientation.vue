<script setup lang="ts">
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@ui/registry/tailwind/ui/carousel';
</script>

<template>
  <Carousel
    orientation="vertical"
    class="relative w-full max-w-xsw-full max-w-xs"
    :opts="{
      align: 'start',
    }"
  >
    <CarouselContent class="-mt-1 h-[200px]">
      <CarouselItem
        v-for="(_, index) in 5"
        :key="index"
        class="p-1 md:basis-1/2"
      >
        <div class="flex items-center justify-center p-6 border rounded-lg text-4xl font-semibold select-none">
          {{ index + 1 }}
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>
