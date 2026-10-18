---
title: Autocomplete
description: A text field that suggests matching options as you type.
source: autocomplete
primitive: https://reka-ui.com/docs/components/autocomplete
label: New
---

## Preview

<ComponentPreview name="Autocomplete" />

## Installation

<ComponentInstall name="autocomplete" />

## Usage

```vue
<script setup lang="ts">
import {
  Autocomplete,
  AutocompleteAnchor,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
} from '@/components/ui/autocomplete';
</script>

<template>
  <Autocomplete v-model="value" open-on-focus>
    <AutocompleteAnchor>
      <AutocompleteInput placeholder="Search fruit..." />
    </AutocompleteAnchor>
    <AutocompleteList>
      <AutocompleteEmpty>No fruit found.</AutocompleteEmpty>
      <AutocompleteItem value="Apple">
        Apple
      </AutocompleteItem>
    </AutocompleteList>
  </Autocomplete>
</template>
```

`v-model` is the input text. Items stay visible while their value matches that text. Set `open-on-focus` to show the list when the field is focused.

### Autocomplete or Combobox

Use Autocomplete when any text is a valid answer and the options are only suggestions, such as a search field or a city name. The value is the typed string. Use [Combobox](/components/combobox) when the value must be one of the options. There, typing only filters the list.

## Examples

### Fruits

<ComponentPreview name="Autocomplete" />

## API Reference

<!-- @include: @/content/meta/autocomplete.md -->

## Accessibility

The field is a combobox. The list is a listbox, and the highlighted option follows the arrow keys.

| Key | Description |
| --- | --- |
| <kbd>ArrowDown</kbd> or <kbd>ArrowUp</kbd> | Moves the highlight through the matching options. |
| <kbd>Enter</kbd> | Sets the input to the highlighted option. |
| <kbd>Esc</kbd> | Closes the list. |
