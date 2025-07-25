<script setup lang="ts">
import { ref } from 'vue';
import { watchOnce } from '@vueuse/core';
import { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@ui/registry/tailwind/ui/carousel';

const emblaMainApi = ref<CarouselApi>();
const emblaThumbnailApi = ref<CarouselApi>();
const selectedIndex = ref(0);

function onSelect() {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) {
    return;
  }

  selectedIndex.value = emblaMainApi.value.selectedScrollSnap();
  emblaThumbnailApi.value.scrollTo(emblaMainApi.value.selectedScrollSnap());
}

function onThumbClick(index: number) {
  if (!emblaMainApi.value || !emblaThumbnailApi.value) {
    return;
  }

  emblaMainApi.value.scrollTo(index);
}

watchOnce(emblaMainApi, (emblaMainApi) => {
  if (!emblaMainApi) {
    return;
  }

  onSelect();
  emblaMainApi.on('select', onSelect);
  emblaMainApi.on('reInit', onSelect);
});
</script>

<template>
  <div class="w-full sm:w-auto">
    <Carousel
      class="relative w-full max-w-xs"
      @init-api="(val) => emblaMainApi = val"
    >
      <CarouselContent>
        <CarouselItem
          v-for="(_, index) in 10"
          :key="index"
        >
          <div class="p-1">
            <div class="flex items-center justify-center aspect-square p-6 border rounded-lg text-4xl font-semibold select-none">
              {{ index + 1 }}
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    <Carousel
      class="relative w-full max-w-xs"
      @init-api="(val) => emblaThumbnailApi = val"
    >
      <CarouselContent class="flex gap-1 ml-0">
        <CarouselItem
          v-for="(_, index) in 10"
          :key="index"
          class="pl-0 basis-1/4 cursor-pointer"
          @click="onThumbClick(index)"
        >
          <div
            class="p-1"
            :class="index === selectedIndex ? '' : 'opacity-50'"
          >
            <div class="flex items-center justify-center aspect-square p-6 border rounded-lg text-xl font-semibold select-none">
              {{ index + 1 }}
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </div>
</template>
