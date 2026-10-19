---
title: Scroll-area
description: Augments native scroll functionality for custom, cross-browser styling.
source: scroll-area
primitive: https://reka-ui.com/docs/components/scroll-area
---

## Preview

<ComponentPreview name="ScrollArea" />

## Installation

<ComponentInstall name="scroll-area" />

## Usage

```vue
<script setup lang="ts">
import { ScrollArea } from '@/components/ui/scroll-area';
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

`ScrollArea` renders a vertical scrollbar. Add a `<ScrollBar orientation="horizontal" />` inside it to scroll horizontally.

## Examples

### Horizontal Scrolling

<ComponentPreview name="ScrollAreaHorizontal" />

## API Reference

<!-- @include: @/content/meta/scroll-area.md -->

## Accessibility

Scrolling stays native, so the content remains reachable with the keyboard and assistive technologies. Only the scrollbars are custom.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the next focusable element inside the scroll area, scrolling it into view. |
| <kbd>ArrowUp</kbd> / <kbd>ArrowDown</kbd> | Scrolls the focused viewport vertically, as in a native scroll container. |
| <kbd>ArrowLeft</kbd> / <kbd>ArrowRight</kbd> | Scrolls the focused viewport horizontally, as in a native scroll container. |
| <kbd>PageUp</kbd> / <kbd>PageDown</kbd> | Scrolls the focused viewport by one page. |
