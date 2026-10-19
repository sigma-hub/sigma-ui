---
title: Faceted Filter
description: A filter component with multi-select options, search functionality, and optional item creation.
source: faceted-filter
---

## Preview

<ComponentPreview name="FacetedFilter" />

## Installation

<ComponentInstall name="faceted-filter" />

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { FacetedFilter } from '@/components/ui/faceted-filter';

const selected = ref<string[]>([]);
</script>

<template>
  <FacetedFilter
    v-model="selected"
    title="Status"
    :options="['Backlog', 'Todo', 'Done']"
  />
</template>
```

- `v-model` is the list of selected values.
- `maxBadges` limits how many selections are shown on the trigger before they collapse into a "+N" badge.
- `allowCreate` shows an Add button that emits `create` when the search matches nothing.

## Examples

### Basic

<ComponentPreview name="FacetedFilter" />

### With Create Option

<ComponentPreview name="FacetedFilterWithCreate" />

### With Footer

<ComponentPreview name="FacetedFilterWithFooter" />

## API Reference

<!-- @include: @/content/meta/faceted-filter.md -->

## Accessibility

The trigger is a button that opens a listbox. Options are toggled with the keyboard, and selected values are exposed as badges.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the trigger. |
| <kbd>Enter</kbd> or <kbd>Space</kbd> | Opens the list. |
| <kbd>ArrowDown</kbd> | Moves to the next option. |
| <kbd>ArrowUp</kbd> | Moves to the previous option. |
| <kbd>Enter</kbd> | Toggles the focused option. |
| <kbd>Escape</kbd> | Closes the list. |
