---
title: Date Field
description: A field for typing a date, one segment at a time.
source: date-field
primitive: https://reka-ui.com/docs/components/date-field
label: New
---

## Preview

<ComponentPreview name="DateField" />

## Installation

<ComponentInstall name="date-field" />

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { type DateValue } from '@internationalized/date';
import { DateField } from '@/components/ui/date-field';

const value = ref<DateValue>();
</script>

<template>
  <DateField v-model="value" />
</template>
```

- `v-model` is an [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) `DateValue`. `CalendarDate` gives day segments, and `CalendarDateTime` or `ZonedDateTime` add time segments. `granularity` picks the smallest segment (`day` by default, or `hour`, `minute`, `second`), and `hourCycle` switches between a 12-hour and a 24-hour clock.
- `minValue` and `maxValue` limit the range. A value outside it sets `data-invalid` on the field, and the field shows the destructive border.
- The field renders each segment in a `DateFieldInput`. Pass your own default slot to render the segments yourself, for example to add an icon.
- Give the field an `id` and point a label at it with `for`. Clicking the label focuses the first segment.

### Related

- [Time Field](./time-field)
- [Date Picker](./date-picker), when the date is picked from a calendar

## Examples

### With label

<ComponentPreview name="DateFieldWithLabel" />

### Granularity and hour cycle

<ComponentPreview name="DateFieldGranularity" />

### Min and max

<ComponentPreview name="DateFieldMinMax" />

### Disabled

<ComponentPreview name="DateFieldDisabled" />

### Invalid

<ComponentPreview name="DateFieldInvalid" />

### Form

<ComponentPreview name="DateFieldForm" />

## API Reference

<!-- @include: @/content/meta/date-field.md -->

## Accessibility

The field is a group of spin buttons, one for each segment (month, day, and year). Typing a number fills the focused segment and moves to the next one.

| Key | Description |
| --- | --- |
| <kbd>ArrowUp</kbd> or <kbd>ArrowDown</kbd> | Increases or decreases the focused segment. |
| <kbd>ArrowLeft</kbd> or <kbd>ArrowRight</kbd> | Moves to the previous or next segment. |
| <kbd>Backspace</kbd> | Deletes the last digit of the focused segment. |
| <kbd>Tab</kbd> | Moves to the next segment, then out of the field. |
