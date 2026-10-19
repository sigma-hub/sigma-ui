---
title: Range Calendar
description: A calendar component that allows users to select a range of dates.
source: range-calendar
primitive: https://reka-ui.com/docs/components/range-calendar
---

## Preview

<ComponentPreview name="RangeCalendar" />

## Installation

<ComponentInstall name="range-calendar" />

## Usage

```vue
<script setup lang="ts">
import { type Ref, ref } from 'vue';
import type { DateRange } from 'reka-ui';
import { getLocalTimeZone, today } from '@internationalized/date';
import { RangeCalendar } from '@/components/ui/range-calendar';

const start = today(getLocalTimeZone());

const value = ref({
  start,
  end: start.add({ days: 7 }),
}) as Ref<DateRange>;
</script>

<template>
  <RangeCalendar
    v-model="value"
    class="rounded-md border"
  />
</template>
```

### About

The `<RangeCalendar />` component is built on top of the [Reka UI Range Calendar](https://reka-ui.com/docs/components/range-calendar) component, which uses the [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) package to handle dates.

- `v-model` is a `DateRange` with `start` and `end` date values.
- `minValue`, `maxValue`, and `isDateUnavailable` restrict the dates that can be selected.

## Examples

### Two Months

Set `number-of-months` to display several months side by side.

```vue
<template>
  <RangeCalendar
    v-model="value"
    :number-of-months="2"
    class="rounded-md border"
  />
</template>
```

## API Reference

<!-- @include: @/content/meta/range-calendar.md -->

## Accessibility

Renders the days as a [grid](https://www.w3.org/WAI/ARIA/apg/patterns/grid/) of buttons with accessible date labels. Reka UI handles focus management and keyboard navigation.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the navigation buttons, then to the focused day of the grid. |
| <kbd>Space</kbd> | When focus is on a navigation button, changes the month. When focus is on a day, selects it as the start or the end of the range. |
| <kbd>Enter</kbd> | When focus is on a navigation button, changes the month. When focus is on a day, selects it as the start or the end of the range. |
| <kbd>ArrowRight</kbd> | Moves focus to the next day. |
| <kbd>ArrowLeft</kbd> | Moves focus to the previous day. |
| <kbd>ArrowDown</kbd> | Moves focus to the same day of the next week. |
| <kbd>ArrowUp</kbd> | Moves focus to the same day of the previous week. |
| <kbd>Esc</kbd> | While a range is being selected, cancels the selection and restores the previous range. |
