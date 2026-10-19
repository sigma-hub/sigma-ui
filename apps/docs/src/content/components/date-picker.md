---
title: Date Picker
description: A date picker built from a popover and a calendar.
primitive: https://reka-ui.com/docs/components/date-picker
---

## Preview

<ComponentPreview name="DatePicker" size="lg" />

## Installation

The date picker is not its own component. Install the parts it is built from:

<ComponentInstall name="popover" />

<ComponentInstall name="calendar" />

The calendar item also includes `MonthPicker` and `YearPicker`, which the month and year examples below use.

Use a range calendar instead of a calendar when the field selects a start and an end date:

<ComponentInstall name="range-calendar" />

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { type DateValue } from '@internationalized/date';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

const value = ref<DateValue>();
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <Button variant="outline">
        {{ value ? value.toString() : 'Pick a date' }}
      </Button>
    </PopoverTrigger>
    <PopoverContent class="w-auto p-0">
      <Calendar v-model="value" />
    </PopoverContent>
  </Popover>
</template>
```

`v-model` on `Calendar` is a `DateValue` from `@internationalized/date`. A range picker uses `RangeCalendar` and a `{ start, end }` value.

To pick only a month or a year, put `MonthPicker` or `YearPicker` in the popover instead of `Calendar`. Their `v-model` is a `DateValue` too, and `minValue`, `maxValue`, `isMonthDisabled`, and `isYearDisabled` limit what can be selected.

## Examples

### Date picker

<ComponentPreview name="DatePicker" size="lg" />

### Date range picker

<ComponentPreview name="DatePickerWithRange" size="lg" />

### Independent months

<ComponentPreview name="DatePickerWithIndependentMonths" size="lg" />

### Month picker

<ComponentPreview name="DatePickerMonth" size="lg" />

### Year picker

<ComponentPreview name="DatePickerYear" size="lg" />

### With presets

<ComponentPreview name="DatePickerWithPresets" size="lg" />

### Form

<ComponentPreview name="DatePickerForm" size="lg" />

## API Reference

See the [Popover](/components/popover#api-reference), [Calendar](/components/calendar#api-reference), and [Range Calendar](/components/range-calendar#api-reference) references. `MonthPicker` and `YearPicker` are listed in the Calendar reference. The date picker adds no props of its own.

## Accessibility

The trigger is a button. The calendar inside the popover follows the [calendar grid pattern](https://reka-ui.com/docs/components/calendar): arrow keys move between days, and Enter or Space selects the focused day. The month and year pickers work the same way on a grid of months or years. Escape closes the popover.

| Key | Description |
| --- | --- |
| <kbd>Enter</kbd> or <kbd>Space</kbd> | Opens the calendar when the trigger is focused, and selects the focused day when the grid is focused. |
| <kbd>ArrowLeft</kbd> / <kbd>ArrowRight</kbd> | Moves to the previous or next day. |
| <kbd>ArrowUp</kbd> / <kbd>ArrowDown</kbd> | Moves to the same weekday in the previous or next week. |
| <kbd>PageUp</kbd> / <kbd>PageDown</kbd> | Moves to the previous or next month, or the previous or next page of months or years. |
| <kbd>Escape</kbd> | Closes the popover and returns focus to the trigger. |
