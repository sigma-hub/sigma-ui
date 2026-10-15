---
title: Button Group
description: Join related buttons, inputs, and text into a single control.
source: button-group
label: New
---

## Preview

<ComponentPreview name="ButtonGroup" />

## Installation

<ComponentInstall name="button-group" />

## Usage

```vue
<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
</script>

<template>
  <ButtonGroup>
    <Button variant="outline">Archive</Button>
    <Button variant="outline">Report</Button>
  </ButtonGroup>
</template>
```

`ButtonGroup` joins its children by removing the inner borders and corner radii. Set `orientation` to `horizontal` or `vertical`. Nest groups to add spacing between them.

- `ButtonGroupText` is static text or an icon inside the group, such as a URL prefix. Use `as-child` to render a `Label`.
- `ButtonGroupSeparator` divides buttons that have no border, such as the `secondary` variant.

## Examples

### Orientation

<ComponentPreview name="ButtonGroupOrientation" />

### With input

Inputs grow to fill the free space in the group. Wrap `ButtonGroupText` around a `Label` with `as-child` to label the input.

<ComponentPreview name="ButtonGroupInput" />

### Separator

<ComponentPreview name="ButtonGroupSeparator" />

## API Reference

<!-- @include: @/content/meta/button-group.md -->

## Accessibility

`ButtonGroup` renders `role="group"`. Set `aria-label` or `aria-labelledby` to describe what the buttons do together. Use `ToggleGroup` instead when the buttons toggle a state.

A focused child is raised above its siblings, so the focus ring is not hidden behind the next button.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus between the controls in the group. |
| <kbd>Enter</kbd> or <kbd>Space</kbd> | Activates the focused button. |
