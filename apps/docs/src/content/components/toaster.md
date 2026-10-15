---
title: Toaster
description: An opinionated toast component for Vue.
docs: https://vue-sonner.vercel.app
source: toaster
---

## Preview

<ComponentPreview name="ToasterCustomProgress" />

## Installation

<ComponentInstall name="toaster" />

### Add the Toaster component

Mount `Toaster` once, in your `App.vue` file:

```vue
<script setup lang="ts">
import { Toaster } from '@/components/ui/toaster';
</script>

<template>
  <Toaster />
</template>
```

## Usage

```vue
<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/toaster';
</script>

<template>
  <Button
    variant="outline"
    @click="toast('Event has been created', {
      description: 'Sunday, December 03, 2023 at 9:00 AM',
    })"
  >
    Add to calendar
  </Button>
</template>
```

- The component is based on [vue-sonner](https://vue-sonner.vercel.app/). `toast()` and its variants (`toast.success`, `toast.error`, `toast.promise`, `toast.custom`, and so on) are re-exported from it.
- Pass `action` or `cancel` in the options to render buttons inside the toast.

## Examples

### Basic

<ComponentPreview name="Toaster" />

### Basic with Dialog

<ComponentPreview name="ToasterWithDialog" />

### Custom "simple" template

Renders the `CustomSimple` component through `toast.custom()`.

<ComponentPreview name="ToasterCustomSimple" />

### Custom "progress" template

Renders the `CustomProgress` component through `toast.custom()`.

<ComponentPreview name="ToasterCustomProgress" />

## API Reference

<!-- @include: @/content/meta/toaster.md -->

## Accessibility

vue-sonner renders the toasts in a labelled region with an `aria-live` list, so screen readers announce new toasts without moving focus.

| Key | Description |
| --- | --- |
| <kbd>Alt</kbd> + <kbd>T</kbd> | Moves focus to the notifications region. Change the shortcut with the `hotkey` prop. |
| <kbd>Tab</kbd> | Moves focus to the next button inside the toasts. |
| <kbd>Escape</kbd> | When focus is inside the notifications region, collapses the expanded toasts. |
