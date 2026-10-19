---
title: Popover
description: Displays a popover card with some content over the main content.
source: popover
primitive: https://reka-ui.com/docs/components/popover
---

## Preview

<ComponentPreview name="Popover" />

## Installation

<ComponentInstall name="popover" />

## Usage

```vue
<script setup lang="ts">
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
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

- Use `v-model:open` on `Popover` to control the open state.
- `side`, `align`, and `sideOffset` on `PopoverContent` position the popover relative to the trigger.

## Examples

### Custom Trigger

Use `as-child` on `PopoverTrigger` to render your own button.

```vue
<script setup lang="ts">
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">
        Open popover
      </Button>
    </PopoverTrigger>
    <PopoverContent
      side="top"
      class="w-80"
    >
      Some popover content
    </PopoverContent>
  </Popover>
</template>
```

## API Reference

<!-- @include: @/content/meta/popover.md -->

## Accessibility

Adheres to the [Dialog WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/). Reka UI manages focus and the ARIA attributes of the trigger and the content.

| Key | Description |
| --- | --- |
| <kbd>Space</kbd> | Opens or closes the popover. |
| <kbd>Enter</kbd> | Opens or closes the popover. |
| <kbd>Tab</kbd> | Moves focus to the next focusable element. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moves focus to the previous focusable element. |
| <kbd>Esc</kbd> | Closes the popover and moves focus to the trigger. |
