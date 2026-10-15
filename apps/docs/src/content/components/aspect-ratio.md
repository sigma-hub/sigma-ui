---
title: Aspect Ratio
description: Keep content at a fixed width-to-height ratio.
source: aspect-ratio
primitive: https://reka-ui.com/docs/components/aspect-ratio
label: New
---

## Preview

<ComponentPreview name="AspectRatio" />

## Installation

<ComponentInstall name="aspect-ratio" />

## Usage

```vue
<script setup lang="ts">
import { AspectRatio } from '@/components/ui/aspect-ratio';
</script>

<template>
  <AspectRatio :ratio="16 / 9">
    <img
      src="/photo.jpg"
      alt="Cover"
    >
  </AspectRatio>
</template>
```

`ratio` is width divided by height. `16 / 9` is a widescreen frame, and `1` is a square. The image or other content should fill the box.

## Examples

### 16:9

<ComponentPreview name="AspectRatio" />

## API Reference

<!-- @include: @/content/meta/aspect-ratio.md -->

## Accessibility

The component only constrains layout. Give images an `alt`, and use an empty `alt` when the image is decorative.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to an interactive element inside the frame. |
