---
title: Textarea
description: Multiline textarea input component.
source: textarea
---

## Preview

<ComponentPreview name="Textarea" />

## Installation

<ComponentInstall name="textarea" />

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Textarea } from '@/components/ui/textarea';

const message = ref('');
</script>

<template>
  <Textarea
    v-model="message"
    placeholder="Type your message here."
  />
</template>
```

- `v-model` binds the value. Any other attribute, such as `placeholder`, `rows`, or `disabled`, is passed to the native `<textarea>`.

## Examples

### Default

<ComponentPreview name="Textarea" />

### Disabled

<ComponentPreview name="TextareaDisabled" />

### With Label

<ComponentPreview name="TextareaWithLabel" />

### With Text

<ComponentPreview name="TextareaWithText" />

### With Button

<ComponentPreview name="TextareaWithButton" />

### Form

<ComponentPreview name="TextareaForm" />

## API Reference

<!-- @include: @/content/meta/textarea.md -->

## Accessibility

Renders a native `<textarea>` element. Associate it with a `Label` through `id` and `for`, or set `aria-label`, so it has an accessible name.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the textarea. |
| <kbd>Enter</kbd> | Inserts a new line. |
