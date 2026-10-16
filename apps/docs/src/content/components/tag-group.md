---
title: Tag Group
description: A focusable list of tags that can be selected and removed with the keyboard.
source: tag-group
primitive: https://reka-ui.com/docs/components/tag-group
label: New
---

## Preview

<ComponentPreview name="TagGroup" />

## Installation

<ComponentInstall name="tag-group" />

## Usage

Tag group is the Reka UI tag list. It is not [Tags Input](./tags-input): there is no text field, and the tags come from your own array.

Listen to `remove` and drop those values from the list. Tags stay put until that listener updates the array. Put the label in `TagGroupItemText`.

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  TagGroup,
  TagGroupItem,
  TagGroupItemDelete,
  TagGroupItemText,
} from '@/components/ui/tag-group';

const tags = ref(['News', 'Travel', 'Gaming']);

function removeTags(values: string[]) {
  tags.value = tags.value.filter(tag => !values.includes(tag));
}
</script>

<template>
  <TagGroup
    aria-label="Categories"
    @remove="removeTags"
  >
    <TagGroupItem
      v-for="tag in tags"
      :key="tag"
      :value="tag"
    >
      <TagGroupItemText>{{ tag }}</TagGroupItemText>
      <TagGroupItemDelete />
    </TagGroupItem>
  </TagGroup>
</template>
```

Set `selectionMode` to `single` or `multiple` to make tags selectable. `v-model` is the selected value, or an array when the mode is `multiple`. With no tags, the group renders an empty state and sets `data-empty`.

## Examples

### Removable categories

<ComponentPreview name="TagGroup" />

## API Reference

<!-- @include: @/content/meta/tag-group.md -->

## Accessibility

The group follows the grid pattern. Each tag is a row. Give the group an accessible name with `aria-label`, or place it in a field with a label.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus into the group, then to the focused tag's delete button, then out. |
| <kbd>ArrowRight</kbd> or <kbd>ArrowDown</kbd> | Moves focus to the next tag. |
| <kbd>ArrowLeft</kbd> or <kbd>ArrowUp</kbd> | Moves focus to the previous tag. |
| <kbd>Home</kbd> or <kbd>End</kbd> | Moves focus to the first or last tag. |
| <kbd>Space</kbd> or <kbd>Enter</kbd> | Toggles the focused tag when tags are selectable. |
| <kbd>Delete</kbd> or <kbd>Backspace</kbd> | Removes the focused tag, or every selected tag when the focused tag is selected. |
| <kbd>Escape</kbd> | Clears the selection. |
