---
title: Infusion
description: Displays a visual effect layer that changes the appearance of the components behind it.
source: infusion
---

<script setup>
import InfusionVideoPreview from '../ui/InfusionVideoPreview.vue';
import InfusionInteractivePreview from '../ui/InfusionInteractivePreview.vue';
</script>

## Preview

Adjust the parameters to see how they change the effect. The global Infusion switch enables the page-wide effect.

<InfusionInteractivePreview />

### Video

<InfusionVideoPreview />

## Installation

<ComponentInstall name="infusion" />

## Usage

```vue
<script setup lang="ts">
import { Infusion } from '@/components/ui/infusion';
</script>

<template>
  <Infusion src="/background-image.png" />
</template>
```

Infusion paints an image, blur, and noise layer. Without `relative`, the layer covers the page. With `relative`, it stays inside the nearest positioned parent.

This effect was first built for [Sigma File Manager](https://github.com/aleksey-hoffman/sigma-file-manager).

## Examples

### Full-page effect

```vue
<template>
  <div>
    <Infusion src="/background-image.png" />
    <div>
      <!-- Page content -->
    </div>
  </div>
</template>
```

### Contained effect

```vue
<template>
  <div class="relative h-[400px] overflow-hidden rounded-lg">
    <Infusion
      src="/background-image.png"
      relative
    />
    <div class="relative z-10">
      <!-- Content above the effect -->
    </div>
  </div>
</template>
```

## API Reference

<!-- @include: @/content/meta/infusion.md -->

## Accessibility

The layer is decorative and does not add controls. Keep text on top of it readable, and do not put information into the background image alone.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus past the effect. The layer is not interactive. |
