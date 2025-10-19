---
title: Tooltip
description: A popup that displays information related to an element when the element is hovered or receives keyboard focus.
source: packages/lib/src/registry/tailwind/ui/tooltip
primitive: https://www.reka-ui.com/docs/components/tooltip.html
---

## Preview

<ComponentPreview name="Tooltip" />

## Installation

```bash
npx sigma-ui add tooltip
```

## Examples

### Basic

```vue
<script setup lang="ts">
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger>Hover</TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
```
