<script setup lang="ts">
import { ref } from 'vue';
import { watchOnce } from '@vueuse/core';
import { Carousel, type CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@ui/registry/css/ui/carousel';

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
  <div class="example-sigma-ui-carousel-thumbnails">
    <Carousel
      class="example-sigma-ui-carousel-thumbnails__main"
      @init-api="(val) => emblaMainApi = val"
    >
      <CarouselContent>
        <CarouselItem
          v-for="(_, index) in 10"
          :key="index"
        >
          <div class="example-sigma-ui-carousel-thumbnails__slide">
            <div class="example-sigma-ui-carousel-thumbnails__item">
              {{ index + 1 }}
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>

    <Carousel
      class="example-sigma-ui-carousel-thumbnails__nav"
      @init-api="(val) => emblaThumbnailApi = val"
    >
      <CarouselContent class="example-sigma-ui-carousel-thumbnails__nav-content">
        <CarouselItem
          v-for="(_, index) in 10"
          :key="index"
          class="example-sigma-ui-carousel-thumbnails__nav-slide"
          @click="onThumbClick(index)"
        >
          <div
            class="example-sigma-ui-carousel-thumbnails__nav-wrapper"
            :class="{ 'example-sigma-ui-carousel-thumbnails__nav-wrapper--selected': index === selectedIndex }"
          >
            <div class="example-sigma-ui-carousel-thumbnails__nav-item">
              {{ index + 1 }}
            </div>
          </div>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  </div>
</template>

<style>
.example-sigma-ui-carousel-thumbnails {
  width: 100%;
}

@media (width >= 640px) {
  .example-sigma-ui-carousel-thumbnails {
    width: auto;
  }
}

.example-sigma-ui-carousel-thumbnails__main {
  position: relative;
  width: 100%;
  max-width: 20rem;
}

.example-sigma-ui-carousel-thumbnails__slide {
  padding: 0.25rem;
}

.example-sigma-ui-carousel-thumbnails__item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  aspect-ratio: 1;
  font-size: 2.25rem;
  font-weight: 600;
  user-select: none;
}

.example-sigma-ui-carousel-thumbnails__nav {
  position: relative;
  width: 100%;
  max-width: 20rem;
}

.example-sigma-ui-carousel-thumbnails__nav-content {
  display: flex;
  margin-left: 0;
  gap: 0.25rem;
}

.example-sigma-ui-carousel-thumbnails__nav-slide {
  flex-basis: 25%;
  padding-left: 0;
  cursor: pointer;
}

.example-sigma-ui-carousel-thumbnails__nav-wrapper {
  padding: 0.25rem;
  opacity: 0.5;
}

.example-sigma-ui-carousel-thumbnails__nav-wrapper--selected {
  opacity: 1;
}

.example-sigma-ui-carousel-thumbnails__nav-item {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  aspect-ratio: 1;
  font-size: 1.25rem;
  font-weight: 600;
  user-select: none;
}
</style>
