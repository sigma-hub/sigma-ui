---
title: Select
description: Displays a list of options for the user to pick from, triggered by a button.
source: select
primitive: https://reka-ui.com/docs/components/select
---

## Preview

<ComponentPreview name="Select" />

## Installation

<ComponentInstall name="select" />

## Usage

```vue
<script setup lang="ts">
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
</script>

<template>
  <Select>
    <SelectTrigger>
      <SelectValue placeholder="Select a fruit" />
    </SelectTrigger>
    <SelectContent>
      <SelectGroup>
        <SelectLabel>Fruits</SelectLabel>
        <SelectItem value="apple">
          Apple
        </SelectItem>
      </SelectGroup>
    </SelectContent>
  </Select>
</template>
```

- Use `v-model` to control the selected value, or `defaultValue` to set an initial one.
- `SelectValue` shows the selected item, or its `placeholder` when nothing is selected.

## Examples

### Scrollable

<ComponentPreview name="SelectScrollable" />

### Form

<ComponentPreview name="SelectForm" />

## API Reference

<!-- @include: @/content/meta/select.md -->

## Accessibility

Adheres to the [ListBox WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/listbox/). Reka UI handles the roles, focus management, and typeahead.

| Key | Description |
| --- | --- |
| <kbd>Space</kbd> | When focus is on the trigger, opens the select and focuses the selected item. When focus is on an item, selects it. |
| <kbd>Enter</kbd> | When focus is on the trigger, opens the select and focuses the selected item. When focus is on an item, selects it. |
| <kbd>ArrowDown</kbd> | When focus is on the trigger, opens the select. When focus is on an item, moves focus to the next item. |
| <kbd>ArrowUp</kbd> | When focus is on the trigger, opens the select. When focus is on an item, moves focus to the previous item. |
| <kbd>Esc</kbd> | Closes the select and moves focus to the trigger. |
