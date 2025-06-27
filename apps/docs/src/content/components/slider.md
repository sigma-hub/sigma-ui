---
title: Slider
description: An input where the user selects a value from within a given range.
source: apps/docs/src/lib/registry/tailwind/ui/slider
primitive: https://www.reka-ui.com/docs/components/slider.html
---

## Preview

<ComponentPreview name="Slider" class="max-w-md" />

## Installation

```bash
npx sigma-ui add slider
```

## Examples

### Basic

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { Slider } from '@/components/ui/slider'

const model = ref(33)
</script>

<template>
  <Slider
    v-model="model"
    :max="100"
    :step="1"
  />
</template>
```

### Form

<ComponentPreview name="SliderForm" />
