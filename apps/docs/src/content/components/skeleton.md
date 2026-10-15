---
title: Skeleton
description: Use to show a placeholder while content is loading.
source: skeleton
---

## Preview

<ComponentPreview name="Skeleton" />

## Installation

<ComponentInstall name="skeleton" />

## Usage

```vue
<script setup lang="ts">
import { Skeleton } from '@/components/ui/skeleton';
</script>

<template>
  <Skeleton class="h-4 w-[250px]" />
</template>
```

Set the size and shape of each placeholder with classes, so it matches the content it replaces.

## Examples

### Card

<ComponentPreview name="SkeletonCard" />

## API Reference

<!-- @include: @/content/meta/skeleton.md -->

## Accessibility

Renders a plain `<div>` with a pulse animation and no role. It has no keyboard interactions of its own. Mark the loading region with `aria-busy="true"` so assistive technologies know the content is not ready yet.

| Key | Description |
| --- | --- |
| None | Skeleton is not focusable. |
