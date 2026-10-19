---
title: Progress
description: Displays an indicator of progress.
source: progress
primitive: https://reka-ui.com/docs/components/progress
---

## Preview

<ComponentPreview name="Progress" class="max-w-sm" />

## Installation

<ComponentInstall name="progress" />

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Progress } from '@/components/ui/progress';

const progress = ref(50);
</script>

<template>
  <Progress v-model="progress" />
</template>
```

`v-model` is the completed percentage, from `0` to `100`. The indicator animates when the value changes.

## Examples

### Animated

Update the value over time, for example while a file uploads.

```vue
<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue';
import { Progress } from '@/components/ui/progress';

const progress = ref(0);

const interval = setInterval(() => {
  progress.value = progress.value >= 100 ? 0 : progress.value + 10;
}, 500);

onBeforeUnmount(() => clearInterval(interval));
</script>

<template>
  <Progress v-model="progress" />
</template>
```

## API Reference

<!-- @include: @/content/meta/progress.md -->

## Accessibility

Renders an element with the [`progressbar` role](https://www.w3.org/TR/wai-aria-1.2/#progressbar). Reka UI sets `aria-valuenow`, `aria-valuemin`, and `aria-valuemax` from the value. It has no keyboard interactions.

| Key | Description |
| --- | --- |
| None | Progress is not focusable. |
