---
title: Carousel
description: A carousel with motion and swipe built using Embla.
source: packages/lib/src/registry/tailwind/ui/carousel
primitive: https://www.embla-carousel.com/api
---

## Preview

<ComponentPreview name="CarouselThumbnails" />

## Dependencies

- [Embla Carousel](https://www.embla-carousel.com/): carousel and swiping functionality.

## Installation

```bash
npx sigma-ui add carousel
```

## Examples

More examples at: [Embla Carousel docs](https://www.embla-carousel.com/examples/predefined/)

### Basic

<ComponentPreview name="CarouselBasic" />

### Sizes

To set the size of the items, you can use the `basis` utility class on the `<CarouselItem />`.

<ComponentPreview name="CarouselSize" />

Example

```vue:line-numbers title="Example" {4-6}
// 33% of the carousel width.
<Carousel>
  <CarouselContent>
    <CarouselItem class="basis-1/3">...</CarouselItem>
    <CarouselItem class="basis-1/3">...</CarouselItem>
    <CarouselItem class="basis-1/3">...</CarouselItem>
  </CarouselContent>
</Carousel>
```

Responsive

```vue:line-numbers title="Responsive" {4-6}
// 50% on small screens and 33% on larger screens.
<Carousel>
  <CarouselContent>
    <CarouselItem class="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
    <CarouselItem class="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
    <CarouselItem class="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
  </CarouselContent>
</Carousel>
```

### Spacing

In this component, the easiest way to set the spacing between items is to use a positive padding on the `<CarouselItem />` and a negative margin on the `<CarouselContent />`.

<ComponentPreview name="CarouselSpacing" />

Example

```vue:line-numbers /-ml-4/ /pl-4/
<template>
  <Carousel>
    <CarouselContent class="-ml-4">
      <CarouselItem class="pl-4">
        ...
      </CarouselItem>
      <CarouselItem class="pl-4">
        ...
      </CarouselItem>
      <CarouselItem class="pl-4">
        ...
      </CarouselItem>
    </CarouselContent>
  </Carousel>
</template>
```

Responsive

```vue:line-numbers /-ml-2/ /pl-2/ /md:-ml-4/ /md:pl-4/
<template>
  <Carousel>
    <CarouselContent class="-ml-2 md:-ml-4">
      <CarouselItem class="pl-2 md:pl-4">
        ...
      </CarouselItem>
      <CarouselItem class="pl-2 md:pl-4">
        ...
      </CarouselItem>
      <CarouselItem class="pl-2 md:pl-4">
        ...
      </CarouselItem>
    </CarouselContent>
  </Carousel>
</template>
```

### Orientation

Use the `orientation` prop to set the orientation of the carousel.

<ComponentPreview name="CarouselOrientation" />

```vue
<Carousel orientation="vertical | horizontal">
  ...
</Carousel>
```

### Thumbnails

<ComponentPreview name="CarouselThumbnails" />

## Options

You can pass options to the carousel using the `opts` prop. See the [Embla Carousel docs](https://www.embla-carousel.com/api/options/) for more information.

```vue:line-numbers {3-6}
<template>
  <Carousel
    :opts="{
      align: 'start',
      loop: true,
    }"
  >
    <CarouselContent>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
    </CarouselContent>
  </Carousel>
</template>
```

## API

### Method 1

Use the `@init-api` emit method on `<Carousel />` component to set the instance of the API.

<ComponentPreview name="CarouselApi" />

### Method 2

You can access it through setting a template ref on the `<Carousel />` component.

```vue:line-numbers {2,5,9}
<script setup>
const carouselContainerRef = ref<InstanceType<typeof Carousel> | null>(null)

function accessApi() {
  carouselContainerRef.value?.carouselApi.on('select', () => {})
}
</script>

<template>
  <Carousel ref="carouselContainerRef">
    ...
  </Carousel>
</template>
```

## Events

You can listen to events using the API. To get the API instance use the `@init-api` emit method on the `<Carousel />` component

```vue:line-numbers {5,7-9,25}
<script setup>
import { nextTick, ref, watch } from 'vue'
import { useCarousel } from '@/components/ui/carousel'

const api = ref<CarouselApi>()

function setApi(val: CarouselApi) {
  api.value = val
}

const stop = watch(api, (api) => {
  if (!api) {
    return
    }

  // Watch only once
  nextTick(() => stop())

  api.on('select', () => {
    // Do something on select
  })
})
</script>

<template>
  <Carousel @init-api="setApi">
    ...
  </Carousel>
</template>
```

More about events: [Embla Carousel docs | Events](https://www.embla-carousel.com/api/events/)

## Slot Props

You can get the reactive slot props like `carouselRef, canScrollNext..Prev, scrollNext..Prev` using the `v-slot` directive in the `<Carousel v-slot="slotProps" />` component to extend the functionality.

```vue:line-numbers {2}
<template>
  <Carousel v-slot="{ canScrollNext, canScrollPrev }">
    ...
    <CarouselPrevious v-if="canScrollPrev" />
    <CarouselNext v-if="canScrollNext" />
  </Carousel>
</template>
```

## Plugins

You can use the `plugins` prop to add plugins to the carousel.

```bash
npm i embla-carousel-autoplay
```

```vue:line-numbers {2,8-10}
<script setup lang="ts">
import Autoplay from 'embla-carousel-autoplay'
</script>

<template>
  <Carousel
    class="w-full max-w-xs"
    :plugins="[Autoplay({
      delay: 2000,
    })]"
  >
    ...
  </Carousel>
</template>
```

<ComponentPreview name="CarouselPlugin" />

More about plugins: [Embla Carousel docs | Plugins](https://www.embla-carousel.com/api/plugins/)
