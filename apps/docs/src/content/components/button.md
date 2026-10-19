---
title: Button
description: Displays a button or a component that looks like a button.
source: button
primitive: https://reka-ui.com/docs/utilities/primitive
---

## Preview

<ComponentPreview name="Button" size="unset" />

## Installation

<ComponentInstall name="button" />

## Usage

```vue
<script setup lang="ts">
import { Button } from '@/components/ui/button';
</script>

<template>
  <Button variant="outline">
    Button
  </Button>
</template>
```

Render a link or any other element with the button styles through `as` or `asChild`:

```vue
<template>
  <Button as-child>
    <a href="/login">Login</a>
  </Button>
</template>
```

## Examples

### Secondary

<ComponentPreview name="ButtonSecondary" size="unset" />

### Destructive

<ComponentPreview name="ButtonDestructive" size="unset" />

### Outline

<ComponentPreview name="ButtonOutline" size="unset" />

### Ghost

<ComponentPreview name="ButtonGhost" size="unset" />

### Link

<ComponentPreview name="ButtonLink" size="unset" />

### Icon

<ComponentPreview name="ButtonIcon" size="unset" />

### Sizes

`xs`, `sm`, `default`, and `lg` set the height. `icon-xs`, `icon-sm`, `icon`, and `icon-lg` make a square button.

<ComponentPreview name="ButtonSizes" size="unset" />

### With Icon

<ComponentPreview name="ButtonWithIcon" size="unset" />

### Loading

Set `isLoading` to disable the button and show a spinner. `loadingText` replaces the label while loading.

<ComponentPreview name="ButtonLoading" size="unset" />

### Confirm

`ConfirmButton` shows a checkmark for `confirmDuration` milliseconds after a click, to confirm that the action was completed.

<ComponentPreview name="ButtonConfirm" size="unset" />

### As Child

<ComponentPreview name="ButtonAsChild" size="unset" />

## API Reference

<!-- @include: @/content/meta/button.md -->

## Accessibility

Renders a native `<button>` element by default, so it is focusable and announced as a button. When you render a different element with `as` or `asChild`, make sure it keeps button semantics, or use a link for navigation.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the button. |
| <kbd>Enter</kbd> | Activates the button. |
| <kbd>Space</kbd> | Activates the button. |
