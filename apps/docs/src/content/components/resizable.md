---
title: Resizable
description: Accessible resizable panel groups and layouts with keyboard support.
source: resizable
primitive: https://reka-ui.com/docs/components/splitter
---

## Preview

<ComponentPreview name="Resizable" />

## Installation

<ComponentInstall name="resizable" />

## Usage

```vue
<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
</script>

<template>
  <ResizablePanelGroup direction="horizontal">
    <ResizablePanel>One</ResizablePanel>
    <ResizableHandle />
    <ResizablePanel>Two</ResizablePanel>
  </ResizablePanelGroup>
</template>
```

- `defaultSize`, `minSize`, and `maxSize` on `ResizablePanel` are percentages of the group.
- Set `auto-save-id` on `ResizablePanelGroup` to persist the layout in local storage.

## Examples

### Vertical

Use the `direction` prop to set the direction of the resizable panels.

<ComponentPreview name="ResizableVertical" />

```vue:line-numbers {10}
<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
</script>

<template>
  <ResizablePanelGroup direction="vertical">
    <ResizablePanel>One</ResizablePanel>
    <ResizableHandle />
    <ResizablePanel>Two</ResizablePanel>
  </ResizablePanelGroup>
</template>
```

### Handle

You can set or hide the handle by using the `withHandle` prop on the `ResizableHandle` component.

<ComponentPreview name="ResizableHandle" />

```vue:line-numbers {12}
<script setup lang="ts">
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable';
</script>

<template>
  <ResizablePanelGroup direction="horizontal">
    <ResizablePanel>One</ResizablePanel>
    <ResizableHandle with-handle />
    <ResizablePanel>Two</ResizablePanel>
  </ResizablePanelGroup>
</template>
```

## API Reference

<!-- @include: @/content/meta/resizable.md -->

## Accessibility

Adheres to the [Window Splitter WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/windowsplitter/). Reka UI handles the roles, ARIA attributes, and keyboard interactions of the handle.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the next handle or focusable element. |
| <kbd>Enter</kbd> | If the primary panel is not collapsed, collapses it. If it is collapsed, restores the handle to its previous position. |
| <kbd>ArrowDown</kbd> | Moves a horizontal handle down. |
| <kbd>ArrowUp</kbd> | Moves a horizontal handle up. |
| <kbd>ArrowRight</kbd> | Moves a vertical handle to the right. |
| <kbd>ArrowLeft</kbd> | Moves a vertical handle to the left. |
| <kbd>Home</kbd> | Moves the handle to give the primary panel its smallest allowed size. |
| <kbd>End</kbd> | Moves the handle to give the primary panel its largest allowed size. |
