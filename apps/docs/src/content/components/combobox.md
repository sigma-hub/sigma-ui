---
title: Combobox
description: Autocomplete input with a list of suggestions.
source: combobox
primitive: https://reka-ui.com/docs/components/combobox
---

## Preview

<ComponentPreview name="Combobox" />

## Installation

<ComponentInstall name="combobox" />

## Usage

```vue
<script setup lang="ts">
import { Combobox, ComboboxAnchor, ComboboxEmpty, ComboboxGroup, ComboboxInput, ComboboxItem, ComboboxList } from '@/components/ui/combobox';
</script>

<template>
  <Combobox>
    <ComboboxAnchor>
      <ComboboxInput placeholder="Select a framework..." />
    </ComboboxAnchor>
    <ComboboxList>
      <ComboboxEmpty>No framework found.</ComboboxEmpty>
      <ComboboxGroup>
        <ComboboxItem value="nuxt">
          Nuxt
        </ComboboxItem>
      </ComboboxGroup>
    </ComboboxList>
  </Combobox>
</template>
```

- Bind the selection with `v-model`.
- `by` compares objects by a key, for example `by="label"`.
- Use `ComboboxTrigger` when the field should open from a button instead of the input.

### Combobox or Autocomplete

Use Combobox when the value must be one of the options, such as a framework or a status. Typing only filters the list, and the value is the selected option. Use [Autocomplete](/components/autocomplete) when any text is a valid answer and the options are only suggestions. Its value is the typed string.

## Examples

### Basic

<ComponentPreview name="Combobox" />

### Trigger

<ComponentPreview name="ComboboxTrigger" />

## API Reference

<!-- @include: @/content/meta/combobox.md -->

## Accessibility

Follows the [Combobox WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/). Reka UI wires up the input, listbox, and active descendant.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the input. |
| <kbd>ArrowDown</kbd> | Opens the list and moves to the next option. |
| <kbd>ArrowUp</kbd> | Moves to the previous option. |
| <kbd>Enter</kbd> | Selects the focused option. |
| <kbd>Escape</kbd> | Closes the list. |
| <kbd>Home</kbd> | Moves to the first option. |
| <kbd>End</kbd> | Moves to the last option. |
