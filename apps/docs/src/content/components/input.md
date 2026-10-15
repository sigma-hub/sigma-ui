---
title: Input
description: Displays a form input field.
source: input
---

## Preview

<ComponentPreview name="Input" class="max-w-xs" />

## Installation

<ComponentInstall name="input" />

## Usage

```vue
<script setup lang="ts">
import { Input } from '@/components/ui/input';
</script>

<template>
  <Input
    v-model="email"
    type="email"
    placeholder="Email"
  />
</template>
```

`v-model` binds a string or a number. Every native input attribute, such as `type`, `disabled`, and `placeholder`, is passed through to the `<input>`.

## Examples

### Basic

<ComponentPreview name="Input" class="max-w-xs" />

### File

<ComponentPreview name="InputFile" class="max-w-xs" />

### Disabled

<ComponentPreview name="InputDisabled" class="max-w-xs" />

### With Label

<ComponentPreview name="InputWithLabel" class="max-w-xs" />

### With Button

<ComponentPreview name="InputWithButton" class="max-w-xs" />

### With Icon

<ComponentPreview name="InputWithIcon" class="max-w-xs" />

### Form

<ComponentPreview name="InputForm" />

## API Reference

<!-- @include: @/content/meta/input.md -->

## Accessibility

Renders a native `<input>`. Pair it with a `<Label>` (or `aria-label`) so the field has an accessible name.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the input. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moves focus to the previous focusable element. |
