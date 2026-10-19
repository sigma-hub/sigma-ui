---
title: Separator
description: Visually or semantically separates content.
source: separator
primitive: https://reka-ui.com/docs/components/separator
---

## Preview

<ComponentPreview name="Separator" />

## Installation

<ComponentInstall name="separator" />

## Usage

```vue
<script setup lang="ts">
import { Separator } from '@/components/ui/separator';
</script>

<template>
  <Separator label="Or" />
</template>
```

- `label` displays a short text in the middle of the line.
- Set `decorative` when the separator is purely visual, so it is hidden from assistive technologies.

## Examples

### Vertical

Set `orientation="vertical"` to separate inline items. The parent needs a height.

```vue
<template>
  <div class="flex h-5 items-center space-x-4 text-sm">
    <div>Blog</div>
    <Separator orientation="vertical" />
    <div>Docs</div>
    <Separator orientation="vertical" />
    <div>Source</div>
  </div>
</template>
```

## API Reference

<!-- @include: @/content/meta/separator.md -->

## Accessibility

Renders an element with the [`separator` role](https://www.w3.org/TR/wai-aria-1.2/#separator), or no role when `decorative` is set. It has no keyboard interactions of its own.

| Key | Description |
| --- | --- |
| None | Separator is not focusable. |
