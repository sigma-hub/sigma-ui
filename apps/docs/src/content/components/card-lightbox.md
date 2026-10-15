---
title: Card lightbox
description: A grid of cards where each card expands into a full view on click.
source: card-lightbox
---

## Preview

<ComponentPreview name="CardLightbox" size="lg" />

## Installation

<ComponentInstall name="card-lightbox" />

## Usage

```vue
<script setup lang="ts">
import { CardLightbox } from '@/components/ui/card-lightbox';
import type { Item } from '@/components/ui/card-lightbox';

const items: Item[] = [
  {
    id: '0',
    category: 'Game',
    title: 'Explore the Sky Castle of Aeridor',
    content: '<p>Embark on an epic journey to Aeridor.</p>',
    theme: 'light',
    image: '/images/aeridor.jpg',
  },
];
</script>

<template>
  <CardLightbox :items="items" />
</template>
```

- Each `Item` needs an `id`, `category`, `title`, `image`, and a `theme` (`light` or `dark`) that sets the text color over the image.
- `content` is an HTML string or a Vue component, shown when the card is open.
- The animations use the [`motion-v`](https://motion.dev/docs/vue) library.

## Examples

### Games

A four-card grid with light and dark themed cards and HTML content.

<ComponentPreview name="CardLightbox" size="lg" />

## API Reference

<!-- @include: @/content/meta/card-lightbox.md -->

## Accessibility

Each card renders as a native `button`, and the open view has a close button.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the next card or to the close button. |
| <kbd>Enter</kbd> | Opens the focused card, or closes the open view when the close button is focused. |
| <kbd>Space</kbd> | Opens the focused card, or closes the open view when the close button is focused. |
| <kbd>Esc</kbd> | Closes the open view. |
