---
title: Toggle Group
description: A set of two-state buttons that can be toggled on or off.
source: toggle-group
primitive: https://reka-ui.com/docs/components/toggle-group
---

## Preview

<ComponentPreview name="ToggleGroup" />

## Installation

<ComponentInstall name="toggle-group" />

## Usage

```vue
<script setup lang="ts">
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
</script>

<template>
  <ToggleGroup type="single">
    <ToggleGroupItem value="a">
      A
    </ToggleGroupItem>
    <ToggleGroupItem value="b">
      B
    </ToggleGroupItem>
    <ToggleGroupItem value="c">
      C
    </ToggleGroupItem>
  </ToggleGroup>
</template>
```

- With `type="single"`, one item can be pressed at a time and `v-model` is a `string`.
- With `type="multiple"`, several items can be pressed and `v-model` is a `string[]`.
- Set `variant` and `size` on `ToggleGroup` to style every item.

## Examples

### Default

<ComponentPreview name="ToggleGroup" />

### Outline

<ComponentPreview name="ToggleGroupOutline" />

### Single

<ComponentPreview name="ToggleGroupSingle" />

### Small

<ComponentPreview name="ToggleGroupSmall" />

### Large

<ComponentPreview name="ToggleGroupLarge" />

### Disabled

<ComponentPreview name="ToggleGroupDisabled" />

## API Reference

<!-- @include: @/content/meta/toggle-group.md -->

## Accessibility

Reka UI renders each item as a toggle `button` with `aria-pressed` and uses a roving tabindex to move focus between the items.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the pressed item, or to the first item when none is pressed. |
| <kbd>Space</kbd> | Toggles the focused item. |
| <kbd>Enter</kbd> | Toggles the focused item. |
| <kbd>ArrowDown</kbd> | Moves focus to the next item. |
| <kbd>ArrowRight</kbd> | Moves focus to the next item. |
| <kbd>ArrowUp</kbd> | Moves focus to the previous item. |
| <kbd>ArrowLeft</kbd> | Moves focus to the previous item. |
| <kbd>Home</kbd> | Moves focus to the first item. |
| <kbd>End</kbd> | Moves focus to the last item. |
