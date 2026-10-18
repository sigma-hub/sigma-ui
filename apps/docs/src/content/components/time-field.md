---
title: Time Field
description: A field for typing a time, one segment at a time.
source: time-field
primitive: https://reka-ui.com/docs/components/time-field
label: New
---

## Preview

<ComponentPreview name="TimeField" />

## Installation

<ComponentInstall name="time-field" />

## Usage

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { type TimeValue } from 'reka-ui';
import { TimeField } from '@/components/ui/time-field';

const value = ref<TimeValue>();
</script>

<template>
  <TimeField v-model="value" />
</template>
```

- `v-model` is a `Time` from [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html). A `CalendarDateTime` or `ZonedDateTime` works too, and only its time is edited. `granularity` picks the smallest segment (`minute` by default, or `hour`, `second`), and `hourCycle` switches between a 12-hour and a 24-hour clock.
- `minValue` and `maxValue` limit the range. A value outside it sets `data-invalid` on the field, and the field shows the destructive border.
- The field renders each segment in a `TimeFieldInput`. Pass your own default slot to render the segments yourself, for example to add an icon.
- Give the field an `id` and point a label at it with `for`. Clicking the label focuses the first segment.

### Related

- [Date Field](./date-field)
- [Time Range Field](./time-range-field), for a start and an end time

## Examples

### With label

<ComponentPreview name="TimeFieldWithLabel" />

### Granularity and hour cycle

<ComponentPreview name="TimeFieldGranularity" />

### Min and max

<ComponentPreview name="TimeFieldMinMax" />

### Disabled

<ComponentPreview name="TimeFieldDisabled" />

### Invalid

<ComponentPreview name="TimeFieldInvalid" />

### Form

<ComponentPreview name="TimeFieldForm" />

## API Reference

<!-- @include: @/content/meta/time-field.md -->

## Accessibility

The field is a group of spin buttons, one for each segment (hour, minute, and day period). Typing a number fills the focused segment and moves to the next one.

| Key | Description |
| --- | --- |
| <kbd>ArrowUp</kbd> or <kbd>ArrowDown</kbd> | Increases or decreases the focused segment. |
| <kbd>ArrowLeft</kbd> or <kbd>ArrowRight</kbd> | Moves to the previous or next segment. |
| <kbd>Backspace</kbd> | Deletes the last digit of the focused segment. |
| <kbd>Tab</kbd> | Moves to the next segment, then out of the field. |
