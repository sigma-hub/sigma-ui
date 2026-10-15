---
title: Switch
description: A control that allows the user to toggle between checked and not checked.
source: switch
primitive: https://reka-ui.com/docs/components/switch
---

## Preview

<ComponentPreview name="Switch" />

## Installation

<ComponentInstall name="switch" />

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

const airplaneMode = ref(false);
</script>

<template>
  <div class="flex items-center gap-2">
    <Switch
      id="airplane-mode"
      v-model="airplaneMode"
    />
    <Label for="airplane-mode">Airplane Mode</Label>
  </div>
</template>
```

- `v-model` is a `boolean`. Use `defaultValue` instead for an uncontrolled switch.
- Give the switch an `id` and point a `Label` at it with `for`, so the label is announced and clicking it toggles the switch.

## Examples

### Form

<ComponentPreview name="SwitchForm" />

## API Reference

<!-- @include: @/content/meta/switch.md -->

## Accessibility

Adheres to the [Switch WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/switch/). Reka UI renders it as a `button` with `role="switch"` and `aria-checked`.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the switch. |
| <kbd>Space</kbd> | Toggles the switch. |
| <kbd>Enter</kbd> | Toggles the switch. |
