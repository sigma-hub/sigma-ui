---
title: Kbd
description: Display a keyboard key or a shortcut.
source: kbd
label: New
---

## Preview

<ComponentPreview name="Kbd" />

## Installation

<ComponentInstall name="kbd" />

## Usage

```vue
<script setup lang="ts">
import { Kbd, KbdGroup } from '@/components/ui/kbd';
</script>

<template>
  <KbdGroup>
    <Kbd>Ctrl</Kbd>
    <Kbd>B</Kbd>
  </KbdGroup>
</template>
```

Group keys that belong to one shortcut with `KbdGroup`. Inside a tooltip, the key uses a lighter background so it stays readable on the inverted surface.

## Examples

### Shortcut

<ComponentPreview name="Kbd" />

## API Reference

<!-- @include: @/content/meta/kbd.md -->

## Accessibility

`Kbd` renders a native `<kbd>` element, which assistive technologies announce as a keyboard input. The keys are not interactive.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus past the shortcut. The keys themselves are not focusable. |
