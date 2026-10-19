---
title: Toggle
description: A two-state button that can be either on or off.
source: toggle
primitive: https://reka-ui.com/docs/components/toggle
---

## Preview

<ComponentPreview name="Toggle" />

## Installation

<ComponentInstall name="toggle" />

## Usage

```vue
<script setup lang="ts">
import { Toggle } from '@/components/ui/toggle';
</script>

<template>
  <Toggle aria-label="Toggle bold">
    Bold
  </Toggle>
</template>
```

- Use `v-model` to control the pressed state, or `defaultValue` for an uncontrolled toggle.
- `variant` is `default` or `outline`, and `size` is `default`, `sm`, or `lg`.

## Examples

### Default

<ComponentPreview name="Toggle" />

### Outline

<ComponentPreview name="ToggleItalic" />

### With Text

<ComponentPreview name="ToggleItalicWithText" />

### Small

<ComponentPreview name="ToggleSmall" />

### Large

<ComponentPreview name="ToggleLarge" />

### Disabled

<ComponentPreview name="ToggleDisabled" />

## API Reference

<!-- @include: @/content/meta/toggle.md -->

## Accessibility

Follows the toggle button variant of the [Button WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/button/). Reka UI renders a `button` with `aria-pressed`. Set `aria-label` when the toggle only contains an icon.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the toggle. |
| <kbd>Space</kbd> | Toggles the pressed state. |
| <kbd>Enter</kbd> | Toggles the pressed state. |
