---
title: PIN Input
description: Allows users to input a sequence of one-character alphanumeric inputs.
source: pin-input
primitive: https://reka-ui.com/docs/components/pin-input
---

## Preview

<ComponentPreview name="PinInput" />

## Installation

<ComponentInstall name="pin-input" />

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  PinInput,
  PinInputGroup,
  PinInputInput,
} from '@/components/ui/pin-input';

const value = ref<string[]>([]);
</script>

<template>
  <PinInput
    v-model="value"
    @complete="(value) => console.log(value.join(''))"
  >
    <PinInputGroup>
      <PinInputInput
        v-for="(id, index) in 5"
        :key="id"
        :index="index"
      />
    </PinInputGroup>
  </PinInput>
</template>
```

- `v-model` is a `string[]` with one entry per input. The `complete` event fires when every input is filled.
- Set `type="number"` to accept digits only, and `otp` to enable one-time code autocomplete.

## Examples

### Controlled

<ComponentPreview name="PinInputControlled" />

### Disabled

<ComponentPreview name="PinInputDisabled" />

### Separator

<ComponentPreview name="PinInputSeparator" />

### Form

<ComponentPreview name="PinInputForm" />

## API Reference

<!-- @include: @/content/meta/pin-input.md -->

## Accessibility

Renders a group of native text inputs. Reka UI moves focus between them as you type, delete, or paste.

| Key | Description |
| --- | --- |
| <kbd>ArrowLeft</kbd> | Moves focus to the previous input. |
| <kbd>ArrowRight</kbd> | Moves focus to the next input. |
| <kbd>Home</kbd> | Moves focus to the first input. |
| <kbd>End</kbd> | Moves focus to the last input. |
| <kbd>Backspace</kbd> | Deletes the value of the current input. If it is empty, moves to the previous input and deletes its value. |
| <kbd>Delete</kbd> | Deletes the value of the current input. |
| <kbd>Ctrl</kbd> + <kbd>V</kbd> | Pastes the clipboard into the inputs, starting from the first input when it fills all of them, or from the current input otherwise. |
