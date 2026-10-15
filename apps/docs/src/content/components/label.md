---
title: Label
description: Renders an accessible label associated with controls.
source: label
primitive: https://reka-ui.com/docs/components/label
---

## Preview

<ComponentPreview name="Label" />

## Installation

<ComponentInstall name="label" />

## Usage

```vue
<script setup lang="ts">
import { Label } from '@/components/ui/label';
</script>

<template>
  <Label for="email">Your email address</Label>
</template>
```

- Set `for` to the `id` of the control the label describes, or wrap the control inside the label.
- When the control has the `peer` class and is disabled, the label is dimmed automatically.

## Examples

### With Input

<ComponentPreview name="InputWithLabel" class="max-w-xs" />

## API Reference

<!-- @include: @/content/meta/label.md -->

## Accessibility

Renders a native `<label>` element, so clicking it focuses or toggles the associated control and screen readers announce the label with the control. It has no keyboard interactions of its own.

| Key | Description |
| --- | --- |
| None | The label is not focusable. |
