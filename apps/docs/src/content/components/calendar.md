---
title: Calendar
description: A calendar that lets users view and select dates.
source: calendar
primitive: https://reka-ui.com/docs/components/calendar
---

## Preview

<ComponentPreview name="Calendar" size="lg" />

## Installation

<ComponentInstall name="calendar" />

## Usage

```vue
<script setup lang="ts">
import { type Ref, ref } from 'vue';
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date';
import { Calendar } from '@/components/ui/calendar';

const value = ref(today(getLocalTimeZone())) as Ref<DateValue>;
</script>

<template>
  <Calendar
    v-model="value"
    class="rounded-md border"
  />
</template>
```

- Dates are [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) objects, which solve problems with internationalization. See [Dates & Times in Reka](https://reka-ui.com/docs/guides/dates) for more details.
- Use `v-model` to control the selected date. Set `multiple` to select several dates, then `v-model` is a `DateValue[]`.
- Use `minValue`, `maxValue`, and `isDateDisabled` to limit which dates can be selected.

### Related

- [Range Calendar](./range-calendar)
- [Date Picker](./date-picker)

## Examples

### Form

<ComponentPreview name="CalendarForm" />

### Month and year selects

<ComponentPreview name="CalendarWithSelect" size="lg" />

### Localization

The locale can be changed with the `locale` prop. You can also format the month selector using the `useDateFormatter` composable from Reka UI:

```ts
const formatter = useDateFormatter('en');
const locale = ref('fr');

formatter.setLocale(locale.value);
```

```vue
<template>
  <CalendarRoot :locale="locale">
    ...
  </CalendarRoot>
</template>
```

<ComponentPreview name="CalendarLocalization" size="lg" />

## API Reference

<!-- @include: @/content/meta/calendar.md -->

## Accessibility

Adheres to the [Date Picker Dialog WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/examples/datepicker-dialog/) for its date grid. Reka UI handles the grid roles, labels, and focus management.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | When focus moves onto the calendar, focuses the first navigation button. |
| <kbd>Space</kbd> | When focus is on the previous or next button, navigates the calendar. Otherwise, selects the date. |
| <kbd>Enter</kbd> | When focus is on the previous or next button, navigates the calendar. Otherwise, selects the date. |
| <kbd>ArrowDown</kbd> | When focus is on a date, moves focus to the same day of the next week, changing the month if necessary. |
| <kbd>ArrowUp</kbd> | When focus is on a date, moves focus to the same day of the previous week, changing the month if necessary. |
| <kbd>ArrowRight</kbd> | When focus is on a date, moves focus to the next day, changing the month if necessary. |
| <kbd>ArrowLeft</kbd> | When focus is on a date, moves focus to the previous day, changing the month if necessary. |
