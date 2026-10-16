---
title: Direction
description: Sets the reading direction for Reka primitives, including right-to-left layouts.
source: direction
primitive: https://reka-ui.com/docs/utilities/config-provider
label: New
---

## Preview

<ComponentPreview name="Direction" />

## Installation

<ComponentInstall name="direction" />

## Usage

`Direction` wraps Reka UI `ConfigProvider` and passes `dir` through. Primitives inside it, including portaled menus and dialogs, inherit that direction. `useDirection` reads the nearest value.

Set the same `dir` on `<html>` as well. The provider does not change the document direction, and portaled content is rendered outside this element, so page layout and text alignment follow the document.

```vue
<script setup lang="ts">
import { Direction, useDirection } from '@/components/ui/direction';
</script>

<template>
  <Direction dir="rtl">
    <p>This subtree is right to left.</p>
  </Direction>
</template>
```

## Examples

### Right to left

<ComponentPreview name="Direction" />

## API Reference

<!-- @include: @/content/meta/direction.md -->

## Accessibility

Direction is not a control. It sets the reading direction used by the components inside it. Keep the provider value and the document `dir` in agreement so focus order, text, and layout describe the same direction.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus through the content inside the provider. |
