---
title: Color
description: A color area, channel slider, hex field, and swatch picker.
source: color
primitive: https://reka-ui.com/docs/components/color-area
label: New
---

## Preview

<ComponentPreview name="Color" />

## Installation

<ComponentInstall name="color" />

## Usage

```vue
<script setup lang="ts">
import {
  ColorArea,
  ColorAreaArea,
  ColorAreaThumb,
  ColorField,
  ColorFieldInput,
  ColorSlider,
  ColorSliderThumb,
  ColorSliderTrack,
  ColorSwatch,
} from '@/components/ui/color';
</script>

<template>
  <ColorArea v-model="color">
    <template #default="{ style }">
      <ColorAreaArea :style="style">
        <ColorAreaThumb />
      </ColorAreaArea>
    </template>
  </ColorArea>
  <ColorSlider v-model="color" channel="hue">
    <ColorSliderTrack />
    <ColorSliderThumb />
  </ColorSlider>
  <ColorSwatch :color="color" />
  <ColorField v-model="color">
    <ColorFieldInput />
  </ColorField>
</template>
```

`v-model` is a color string. `ColorArea` defaults to the HSL space, with hue on the horizontal axis and saturation on the vertical axis. `ColorSlider` takes a `channel` such as `hue`, `saturation`, `lightness`, or `alpha`. `ColorSwatchPicker` selects one preset and can share the same `v-model`.

## Examples

### Picker

<ComponentPreview name="Color" />

## API Reference

<!-- @include: @/content/meta/color.md -->

## Accessibility

The area and the slider are sliders. The hex field is a text input, and each preset swatch is an option in a listbox.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus between the swatches, the area, the slider, and the field. |
| <kbd>Arrow</kbd> keys | Move the focused thumb along its channel. |
| <kbd>Enter</kbd> or <kbd>Space</kbd> | Selects the focused preset. |
