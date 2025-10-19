---
title: Popover
description: Displays a popover card with some content over the main content.
source: packages/lib/src/registry/tailwind/ui/popover
primitive: https://www.reka-ui.com/docs/components/popover.html
---

## Preview

<ComponentPreview name="Popover" />

## Installation

```bash
npx sigma-ui add popover
```

## Examples

### Basic

```vue
<script setup lang="ts">
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
</script>

<template>
  <Popover>
    <PopoverTrigger>
      Open popover
    </PopoverTrigger>
    <PopoverContent>
      Some popover content
    </PopoverContent>
  </Popover>
</template>
```
