---
title: Image
description: An image element with a fallback.
source: image
---

## Preview

<ComponentPreview name="Image" />

## Installation

<ComponentInstall name="image" />

## Usage

```vue
<script setup lang="ts">
import { Image } from '@/components/ui/image';
</script>

<template>
  <Image
    src="/photo.jpg"
    alt="A mountain lake"
  />
</template>
```

- `alt` is the accessible name. It defaults to `image`, so set a real description for meaningful photos.
- `glow` adds a soft glow behind the image.
- `shape` is `rounded` or `circle`.
- The `fallback` slot replaces the default placeholder when the image fails to load.

## Examples

### Basic

<ComponentPreview name="ImageBasic" />

### Glow

<ComponentPreview name="ImageGlow" />

### Custom fallback

<ComponentPreview name="ImageCustomFallback" />

## API Reference

<!-- @include: @/content/meta/image.md -->

## Accessibility

The image is announced with its `alt` text. Leave `alt` empty only when the image is decorative, and give meaningful images a description. The fallback is shown when the file fails to load.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus past the image. The image itself is not interactive. |
