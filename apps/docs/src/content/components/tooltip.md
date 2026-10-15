---
title: Tooltip
description: A popup that displays information related to an element when the element is hovered or receives keyboard focus.
source: tooltip
primitive: https://reka-ui.com/docs/components/tooltip
---

## Preview

<ComponentPreview name="Tooltip" />

## Installation

<ComponentInstall name="tooltip" />

## Usage

```vue
<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
</script>

<template>
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger as-child>
        <Button variant="outline">
          Hover
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
```

- `TooltipProvider` shares the open delay between tooltips. Wrap your app, or a section of it, once.
- Use `delayDuration` on `Tooltip` or `TooltipProvider` to change how long the pointer must rest before the tooltip opens.
- Use `as-child` on `TooltipTrigger` to make your own focusable element the trigger.

## Examples

### No Delay

Set `delayDuration` to `0` to open the tooltip as soon as the trigger is hovered.

```vue
<template>
  <TooltipProvider>
    <Tooltip :delay-duration="0">
      <TooltipTrigger as-child>
        <Button variant="outline">
          Hover
        </Button>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>Add to library</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</template>
```

## API Reference

<!-- @include: @/content/meta/tooltip.md -->

## Accessibility

Adheres to the [Tooltip WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/). Reka UI opens the tooltip on hover and keyboard focus, and links it to the trigger with `aria-describedby`.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Opens or closes the tooltip without delay. |
| <kbd>Space</kbd> | If open, closes the tooltip without delay. |
| <kbd>Enter</kbd> | If open, closes the tooltip without delay. |
| <kbd>Escape</kbd> | If open, closes the tooltip without delay. |
