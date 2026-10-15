---
title: Tags Input
description: Tag inputs render tags inside an input, followed by an actual text input.
source: tags-input
primitive: https://reka-ui.com/docs/components/tags-input
---

## Preview

<ComponentPreview name="TagsInput" />

## Installation

<ComponentInstall name="tags-input" />

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from '@/components/ui/tags-input';

const modelValue = ref(['Apple', 'Banana']);
</script>

<template>
  <TagsInput v-model="modelValue">
    <TagsInputItem
      v-for="item in modelValue"
      :key="item"
      :value="item"
    >
      <TagsInputItemText />
      <TagsInputItemDelete />
    </TagsInputItem>

    <TagsInputInput placeholder="Fruits..." />
  </TagsInput>
</template>
```

- `v-model` is a `string[]`. Typing in `TagsInputInput` and pressing <kbd>Enter</kbd> adds a tag.
- Render one `TagsInputItem` per value, with `TagsInputItemText` for the label and `TagsInputItemDelete` for the remove button.

## Examples

### Tags with Combobox

Combines the tags input with a [Combobox](./combobox) so the user picks tags from a filtered list.

<ComponentPreview name="TagsInputCombobox" />

## API Reference

<!-- @include: @/content/meta/tags-input.md -->

## Accessibility

There is no dedicated WAI-ARIA pattern for tags inputs. Reka UI renders the tags followed by a native text input, and handles the keyboard navigation between the input and the tags.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the input. |
| <kbd>Enter</kbd> | When focus is on the input, adds the typed text as a tag. |
| <kbd>Delete</kbd> | When a tag is active, removes it and sets the next tag active. |
| <kbd>Backspace</kbd> | When a tag is active, removes it and sets the previous tag active. |
| <kbd>ArrowRight</kbd> | Sets the next tag active. |
| <kbd>ArrowLeft</kbd> | Sets the previous tag active. |
| <kbd>Home</kbd> | Sets the first tag active. |
| <kbd>End</kbd> | Sets the last tag active. |
