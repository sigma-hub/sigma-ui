---
title: Collapsible
description: An interactive component which expands/collapses a panel.
source: collapsible
primitive: https://reka-ui.com/docs/components/collapsible
---

## Preview

<ComponentPreview name="Collapsible" />

## Installation

<ComponentInstall name="collapsible" />

## Usage

```vue
<script setup lang="ts">
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
</script>

<template>
  <Collapsible>
    <CollapsibleTrigger>Can I use this in my project?</CollapsibleTrigger>
    <CollapsibleContent>
      Yes. Free to use for personal and commercial projects.
    </CollapsibleContent>
  </Collapsible>
</template>
```

- Use `v-model:open` to control the open state, or `defaultOpen` to open it initially.
- Use `as-child` on `<CollapsibleTrigger>` to render your own button as the trigger.

## Examples

### Basic

A list that shows its first item and reveals the rest with an icon button, controlled through `v-model:open`.

<ComponentPreview name="Collapsible" />

## API Reference

<!-- @include: @/content/meta/collapsible.md -->

## Accessibility

Adheres to the [Disclosure WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/). Reka UI sets `aria-expanded` and `aria-controls` on the trigger.

| Key | Description |
| --- | --- |
| <kbd>Space</kbd> | Opens or closes the collapsible. |
| <kbd>Enter</kbd> | Opens or closes the collapsible. |
