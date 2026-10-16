---
title: Month Picker
description: A year of months that can be selected.
source: month-picker
primitive: https://reka-ui.com/docs/components/month-picker
label: New
---

## Preview

<ComponentPreview name="MonthPicker" />

## Installation

<ComponentInstall name="month-picker" />

## Usage

```vue
<script setup lang="ts">
import { MonthPicker } from '@/components/ui/month-picker';
</script>

<template>
  <MonthPicker v-model="value" />
</template>
```

`v-model` is an [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) `DateValue`. The header steps one page at a time. `minValue`, `maxValue`, and `isMonthDisabled` limit which months can be selected.

## Examples

### Single month

<ComponentPreview name="MonthPicker" />

## API Reference

<!-- @include: @/content/meta/month-picker.md -->

## Accessibility

The picker is a grid. Arrow keys move between months, and Enter or Space selects the focused month.

| Key | Description |
| --- | --- |
| <kbd>Arrow</kbd> keys | Move focus to the neighboring month. |
| <kbd>Enter</kbd> or <kbd>Space</kbd> | Selects the focused month. |
| <kbd>PageUp</kbd> or <kbd>PageDown</kbd> | Moves to the previous or next page. |
