---
title: Hover Card
description: For displaying additional content that appears when hovering over a trigger element.
source: packages/lib/src/registry/tailwind/ui/hover-card
primitive: https://www.reka-ui.com/docs/components/hover-card.html
---

## Preview

<ComponentPreview name="HoverCard" />

## Installation

```bash
npx sigma-ui add hover-card
```

## Examples

### Basic

```vue
<script setup lang="ts">
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
</script>

<template>
  <HoverCard>
    <HoverCardTrigger>Hover</HoverCardTrigger>
    <HoverCardContent>
      The Vue Framework – created and maintained by @vuejs.
    </HoverCardContent>
  </HoverCard>
</template>
```
