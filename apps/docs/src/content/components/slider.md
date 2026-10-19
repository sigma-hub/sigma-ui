---
title: Slider
description: An input where the user selects a value from within a given range.
source: slider
primitive: https://reka-ui.com/docs/components/slider
---

## Preview

<ComponentPreview name="Slider" class="max-w-md" />

## Installation

<ComponentInstall name="slider" />

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Slider } from '@/components/ui/slider';

const modelValue = ref([33]);
</script>

<template>
  <Slider
    v-model="modelValue"
    :max="100"
    :step="1"
  />
</template>
```

- `v-model` is a `number[]`. The slider renders one thumb per value, so pass two values (for example `[25, 75]`) to select a range.
- Use `min`, `max`, and `step` to set the range and the increment.

## Examples

### Form

<ComponentPreview name="SliderForm" />

## API Reference

<!-- @include: @/content/meta/slider.md -->

## Accessibility

Adheres to the [Slider WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slider/). Reka UI handles the roles, values, and keyboard support.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the next thumb or focusable element. |
| <kbd>ArrowRight</kbd> | Increments the value by `step`. |
| <kbd>ArrowLeft</kbd> | Decrements the value by `step`. |
| <kbd>ArrowUp</kbd> | Increments the value by `step`. |
| <kbd>ArrowDown</kbd> | Decrements the value by `step`. |
| <kbd>PageUp</kbd> | Increments the value by a larger step. |
| <kbd>PageDown</kbd> | Decrements the value by a larger step. |
| <kbd>Shift</kbd> + <kbd>ArrowUp</kbd> | Increments the value by a larger step. |
| <kbd>Shift</kbd> + <kbd>ArrowDown</kbd> | Decrements the value by a larger step. |
| <kbd>Home</kbd> | Sets the value to its minimum. |
| <kbd>End</kbd> | Sets the value to its maximum. |
