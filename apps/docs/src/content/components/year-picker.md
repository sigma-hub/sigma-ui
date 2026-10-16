---
title: Year Picker
description: A grid of years that can be selected.
source: year-picker
primitive: https://reka-ui.com/docs/components/year-picker
label: New
---

## Preview

<ComponentPreview name="YearPicker" />

## Installation

<ComponentInstall name="year-picker" />

## Usage

```vue
<script setup lang="ts">
import { YearPicker } from '@/components/ui/year-picker';
</script>

<template>
  <YearPicker v-model="value" />
</template>
```

`v-model` is an [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) `DateValue`. The header steps one page at a time. `minValue`, `maxValue`, and `isYearDisabled` limit which years can be selected.

## Examples

### Single year

<ComponentPreview name="YearPicker" />

## API Reference

<!-- @include: @/content/meta/year-picker.md -->

## Accessibility

The picker is a grid. Arrow keys move between years, and Enter or Space selects the focused year.

| Key | Description |
| --- | --- |
| <kbd>Arrow</kbd> keys | Move focus to the neighboring year. |
| <kbd>Enter</kbd> or <kbd>Space</kbd> | Selects the focused year. |
| <kbd>PageUp</kbd> or <kbd>PageDown</kbd> | Moves to the previous or next page. |
