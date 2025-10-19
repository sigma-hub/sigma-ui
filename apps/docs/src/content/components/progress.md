---
title: Progress
description: Displays an indicator of progress.
source: packages/lib/src/registry/tailwind/ui/progress
primitive: https://www.reka-ui.com/docs/components/progress.html
---

## Preview

<ComponentPreview name="Progress" class="max-w-sm" />

## Installation

```bash
npm install reka-ui
```

## Examples

### Basic

```vue
<script setup lang="ts">
import { Progress } from '@/components/ui/progress'

const progress = ref(50)
</script>

<template>
  <Progress v-model="progress" />
</template>
```
