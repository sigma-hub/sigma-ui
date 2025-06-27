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
    <CarouselContent class="-ml-1">
      <CarouselItem
        v-for="(_, index) in 5"
        :key="index"
        class="pl-1 md:basis-1/2 lg:basis-1/3"
      >
        <div class="p-4">
          <div class="flex items-center justify-center p-6 border rounded-lg text-4xl font-semibold select-none">
            {{ index + 1 }}
          </div>
        </div>
      </CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>
