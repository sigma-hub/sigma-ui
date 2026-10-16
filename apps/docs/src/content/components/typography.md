---
title: Typography
description: Styles for headings, paragraphs, lists, and the other text in a page.
source: typography
label: New
---

## Preview

<ComponentPreview name="TypographyDemo" />

## Installation

<ComponentInstall name="typography" />

## Usage

`variant` picks the style and the element. `h1` renders an `h1`, `list` renders a `ul`, and `link` renders an `a`. Pass `as` when the element should differ from that default. The class-only samples on the [typography guide](/docs/typography) are the same styles, applied by hand.

```vue
<script setup lang="ts">
import { Typography } from '@/components/ui/typography';
</script>

<template>
  <Typography variant="h1">
    The Joke Tax Chronicles
  </Typography>
  <Typography variant="p">
    Once upon a time, in a far-off land.
  </Typography>
  <Typography
    variant="link"
    href="#"
  >
    A brilliant plan
  </Typography>
</template>
```

## Examples

### Article

<ComponentPreview name="TypographyDemo" />

## API Reference

<!-- @include: @/content/meta/typography.md -->

## Accessibility

Use the heading variants in order. `h1` through `h4` render those heading elements, so the page outline stays intact. `as` can change the element without changing the look; keep the element and the heading level in agreement.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to a link. Other variants are not focusable. |
