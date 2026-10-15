---
title: Spinner
description: An animated indicator for a loading state.
source: spinner
label: New
---

## Preview

<ComponentPreview name="Spinner" />

## Installation

<ComponentInstall name="spinner" />

## Usage

```vue
<script setup lang="ts">
import { Spinner } from '@/components/ui/spinner';
</script>

<template>
  <Spinner />
</template>
```

Set `label` to change the accessible name. The default is "Loading".

## Examples

### Sizes

<ComponentPreview name="Spinner" />

## API Reference

<!-- @include: @/content/meta/spinner.md -->

## Accessibility

The spinner renders `role="status"` and an `aria-label`, so screen readers announce it. It is not focusable. Hide it, or render it only while work is in progress, so the status is not announced after loading finishes.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus past the spinner. |
