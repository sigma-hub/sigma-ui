---
title: Carousel
description: A carousel with motion and swipe built using Embla.
source: carousel
primitive: https://www.embla-carousel.com/api
---

## Preview

<ComponentPreview name="CarouselThumbnails" />

## Installation

<ComponentInstall name="carousel" />

## Usage

```vue
<script setup lang="ts">
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
</script>

<template>
  <Carousel>
    <CarouselContent>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
      <CarouselItem>...</CarouselItem>
    </CarouselContent>
    <CarouselPrevious />
    <CarouselNext />
  </Carousel>
</template>
```

The carousel is built on [Embla Carousel](https://www.embla-carousel.com/), which handles the scrolling and swiping. More examples are in the [Embla Carousel docs](https://www.embla-carousel.com/examples/predefined/).

### Options

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

### Events

You can listen to events using the API. To get the API instance use the `@init-api` emit method on the `<Carousel />` component.

```vue:line-numbers {5,7-9,26}
<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';
import type { CarouselApi } from '@/components/ui/carousel';

const api = ref<CarouselApi>();

function setApi(val: CarouselApi) {
  api.value = val;
}

const stop = watch(api, (api) => {
  if (!api) {
    return;
  }

  // Watch only once
  nextTick(() => stop());

  api.on('select', () => {
    // Do something on select
  });
});
</script>

<template>
  <Carousel @init-api="setApi">
    ...
  </Carousel>
</template>
```

More about events: [Embla Carousel docs | Events](https://www.embla-carousel.com/api/events/)

### Slot props

You can get the reactive slot props like `carouselRef`, `canScrollNext`, `canScrollPrev`, `scrollNext`, and `scrollPrev` using the `v-slot` directive on the `<Carousel />` component to extend the functionality.

```vue:line-numbers {2}
<template>
  <Carousel v-slot="{ canScrollNext, canScrollPrev }">
    ...
    <CarouselPrevious v-if="canScrollPrev" />
    <CarouselNext v-if="canScrollNext" />
  </Carousel>
</template>
```

## Examples

### Basic

<ComponentPreview name="CarouselBasic" />

### Sizes

To set the size of the items, you can use the `basis` utility class on the `<CarouselItem />`.

<ComponentPreview name="CarouselSize" />

```vue:line-numbers {5-7}
<template>
  <!-- 33% of the carousel width. -->
  <Carousel>
    <CarouselContent>
      <CarouselItem class="basis-1/3">...</CarouselItem>
      <CarouselItem class="basis-1/3">...</CarouselItem>
      <CarouselItem class="basis-1/3">...</CarouselItem>
    </CarouselContent>
  </Carousel>
</template>
```

Responsive:

```vue:line-numbers {5-7}
<template>
  <!-- 50% on small screens and 33% on larger screens. -->
  <Carousel>
    <CarouselContent>
      <CarouselItem class="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
      <CarouselItem class="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
      <CarouselItem class="md:basis-1/2 lg:basis-1/3">...</CarouselItem>
    </CarouselContent>
  </Carousel>
</template>
```

### Spacing

In this component, the easiest way to set the spacing between items is to use a positive padding on the `<CarouselItem />` and a negative margin on the `<CarouselContent />`.

<ComponentPreview name="CarouselSpacing" />

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

Responsive:

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

Use the `orientation` prop to set the orientation of the carousel to `vertical` or `horizontal`.

<ComponentPreview name="CarouselOrientation" />

### Thumbnails

<ComponentPreview name="CarouselThumbnails" />

### API

Use the `@init-api` emit method on the `<Carousel />` component to get the instance of the API.

<ComponentPreview name="CarouselApi" />

You can also access it by setting a template ref on the `<Carousel />` component.

```vue:line-numbers {2,5,10}
<script setup lang="ts">
const carouselContainerRef = ref<InstanceType<typeof Carousel> | null>(null);

function accessApi() {
  carouselContainerRef.value?.carouselApi.on('select', () => {});
}
</script>

<template>
  <Carousel ref="carouselContainerRef">
    ...
  </Carousel>
</template>
```

### Plugins

You can use the `plugins` prop to add plugins to the carousel. Install the plugin package first:

```bash
npm i embla-carousel-autoplay
```

```vue:line-numbers {2,8-10}
<script setup lang="ts">
import Autoplay from 'embla-carousel-autoplay';
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

## API Reference

<!-- @include: @/content/meta/carousel.md -->

## Accessibility

Follows the [Carousel WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/carousel/): the root is a focusable `region` with `aria-roledescription="carousel"`, and each item is a `group` with `aria-roledescription="slide"`.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the carousel, then to the previous and next buttons. |
| <kbd>ArrowLeft</kbd> | When the horizontal carousel is focused, scrolls to the previous slide. |
| <kbd>ArrowRight</kbd> | When the horizontal carousel is focused, scrolls to the next slide. |
| <kbd>ArrowUp</kbd> | When the vertical carousel is focused, scrolls to the previous slide. |
| <kbd>ArrowDown</kbd> | When the vertical carousel is focused, scrolls to the next slide. |
| <kbd>Enter</kbd> | Activates the focused previous or next button. |
