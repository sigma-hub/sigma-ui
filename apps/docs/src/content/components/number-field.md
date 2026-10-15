---
title: Number Field
description: A number field allows a user to enter a number and increment or decrement the value using stepper buttons.
source: number-field
primitive: https://reka-ui.com/docs/components/number-field
---

## Preview

<ComponentPreview name="NumberField" class="max-w-[180px]" />

## Installation

<ComponentInstall name="number-field" />

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@/components/ui/number-field';

const value = ref(18);
</script>

<template>
  <NumberField
    v-model="value"
    :min="0"
  >
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
```

- Use `v-model` to control the value, or `defaultValue` to set an initial value.
- `min`, `max`, and `step` limit the value and set the increment of the stepper buttons.
- `formatOptions` takes [`Intl.NumberFormat`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/NumberFormat) options to format decimals, percentages, or currencies.

## Examples

### Disabled

<ComponentPreview name="NumberFieldDisabled" class="max-w-[180px]" />

### Decimal

<ComponentPreview name="NumberFieldDecimal" class="max-w-[180px]" />

### Percentage

<ComponentPreview name="NumberFieldPercentage" class="max-w-[180px]" />

### Currency

<ComponentPreview name="NumberFieldCurrency" class="max-w-[220px]" />

### Form

<ComponentPreview name="NumberFieldForm" class="max-w-xs" />

## API Reference

<!-- @include: @/content/meta/number-field.md -->

## Accessibility

Adheres to the [Spinbutton WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/spinbutton/). Reka UI handles the roles, ARIA attributes, and keyboard interactions.

| Key | Description |
| --- | --- |
| <kbd>ArrowUp</kbd> | Increases the value. |
| <kbd>ArrowDown</kbd> | Decreases the value. |
| <kbd>PageUp</kbd> | Increases the value by a scale of 10. |
| <kbd>PageDown</kbd> | Decreases the value by a scale of 10. |
| <kbd>Home</kbd> | Sets the value to the minimum, when `min` is set. |
| <kbd>End</kbd> | Sets the value to the maximum, when `max` is set. |
| <kbd>Enter</kbd> | Applies the typed value. |
| <kbd>Tab</kbd> | Moves focus to the next focusable element. |
