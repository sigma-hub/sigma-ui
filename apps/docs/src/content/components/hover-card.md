---
title: Hover Card
description: For displaying additional content that appears when hovering over a trigger element.
source: hover-card
primitive: https://reka-ui.com/docs/components/hover-card
---

## Preview

<ComponentPreview name="HoverCard" />

## Installation

<ComponentInstall name="hover-card" />

## Usage

```vue
<script setup lang="ts">
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
</script>

<template>
  <HoverCard>
    <HoverCardTrigger>Hover</HoverCardTrigger>
    <HoverCardContent>
      The Vue Framework - created and maintained by @vuejs.
    </HoverCardContent>
  </HoverCard>
</template>
```

- Use `open-delay` and `close-delay` on `<HoverCard>` to tune how long the pointer has to stay on the trigger before the card opens or closes.
- Use `v-model:open` to control the open state.

## Examples

### Custom Delays

Opens immediately and stays open a little longer after the pointer leaves the trigger.

```vue
<script setup lang="ts">
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
</script>

<template>
  <HoverCard
    :open-delay="0"
    :close-delay="500"
  >
    <HoverCardTrigger href="https://vuejs.org">
      @vuejs
    </HoverCardTrigger>
    <HoverCardContent side="top">
      The Progressive JavaScript Framework.
    </HoverCardContent>
  </HoverCard>
</template>
```

## API Reference

<!-- @include: @/content/meta/hover-card.md -->

## Accessibility

The hover card is intended for sighted pointer users and is ignored by screen readers, so don't put content in it that is only available there. Reka UI opens it on keyboard focus of the trigger as well.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Opens or closes the hover card when the trigger receives or loses focus. |
| <kbd>Enter</kbd> | Follows the trigger link. |
