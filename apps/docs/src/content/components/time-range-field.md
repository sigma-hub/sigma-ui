---
title: Time Range Field
description: A field for a start time and an end time.
source: time-range-field
primitive: https://reka-ui.com/docs/components/time-range-field
label: New
---

## Preview

<ComponentPreview name="TimeRangeField" />

## Installation

<ComponentInstall name="time-range-field" />

## Usage

```vue
<script setup lang="ts">
import { type Ref, ref } from 'vue';
import { Time } from '@internationalized/date';
import type { TimeValue } from 'reka-ui';
import { TimeRangeField } from '@/components/ui/time-range-field';

const value = ref({
  start: new Time(9, 0),
  end: new Time(17, 0),
}) as Ref<{ start: TimeValue; end: TimeValue }>;
</script>

<template>
  <TimeRangeField v-model="value" />
</template>
```

- `v-model` is a `{ start, end }` pair of [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) `Time` values. `granularity` is `minute` by default, and `hourCycle` switches between a 12-hour and a 24-hour clock.
- The field renders the start segments, a dash, and the end segments, each in a `TimeRangeFieldInput`. To render them yourself, use the default slot. It gives `segments.start` and `segments.end`, and each segment has a `part` and the `value` to show:

```vue
<template>
  <TimeRangeField v-slot="{ segments }" v-model="value">
    <TimeRangeFieldInput
      v-for="(item, index) in segments.start"
      :key="`start-${item.part}-${index}`"
      :part="item.part"
      type="start"
    >
      {{ item.value }}
    </TimeRangeFieldInput>
    <span>to</span>
    <TimeRangeFieldInput
      v-for="(item, index) in segments.end"
      :key="`end-${item.part}-${index}`"
      :part="item.part"
      type="end"
    >
      {{ item.value }}
    </TimeRangeFieldInput>
  </TimeRangeField>
</template>
```

### Related

- [Time Field](./time-field), for a single time

## Examples

### Office hours

<ComponentPreview name="TimeRangeField" />

## API Reference

<!-- @include: @/content/meta/time-range-field.md -->

## Accessibility

Each segment is a spin button. Arrow keys change the focused segment, and left and right move between segments.

| Key | Description |
| --- | --- |
| <kbd>ArrowUp</kbd> or <kbd>ArrowDown</kbd> | Increases or decreases the focused segment. |
| <kbd>ArrowLeft</kbd> or <kbd>ArrowRight</kbd> | Moves to the previous or next segment. |
