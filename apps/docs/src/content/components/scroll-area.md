---
title: Scroll-area
description: Augments native scroll functionality for custom, cross-browser styling.
source: apps/docs/src/lib/registry/tailwind/ui/scroll-area
primitive: https://www.reka-ui.com/docs/components/scroll-area.html
---

## Preview

<ComponentPreview name="ScrollArea" />

## Installation

```bash
npx sigma-ui add scroll-area
```
## Usage

```vue
<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area'
</script>

<template>
  <ScrollArea class="h-[200px] w-[350px] rounded-md border p-4">
    Jokester began sneaking into the castle in the middle of the night and leaving
    jokes all over the place: under the king's pillow, in his soup, even in the
    royal toilet. The king was furious, but he couldn't seem to stop Jokester. And
    then, one day, the people of the kingdom discovered that the jokes left by
    Jokester were so funny that they couldn't help but laugh. And once they
    started laughing, they couldn't stop.
  </ScrollArea>
</template>
```

## Examples

### Horizontal Scrolling

<ComponentPreview name="ScrollAreaHorizontal" />
