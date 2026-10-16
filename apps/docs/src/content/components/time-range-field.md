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
import { Time } from '@internationalized/date';
import { TimeRangeField, TimeRangeFieldInput } from '@/components/ui/time-range-field';
</script>

<template>
  <TimeRangeField v-slot="{ segments }" v-model="value">
    <template v-for="(item, index) in segments.start" :key="`start-${item.part}-${index}`">
      <TimeRangeFieldInput :part="item.part" type="start">
        {{ item.value }}
      </TimeRangeFieldInput>
    </template>
    <span>to</span>
    <template v-for="(item, index) in segments.end" :key="`end-${item.part}-${index}`">
      <TimeRangeFieldInput :part="item.part" type="end">
        {{ item.value }}
      </TimeRangeFieldInput>
    </template>
  </TimeRangeField>
</template>
```

`v-model` is a `{ start, end }` pair of [@internationalized/date](https://react-spectrum.adobe.com/internationalized/date/index.html) `Time` values. The field slot gives `segments.start` and `segments.end`, and each segment's `value` is the text rendered inside `TimeRangeFieldInput`. `part` is `hour`, `minute`, `second`, `dayPeriod`, or `literal`, and `type` is `start` or `end`. `granularity` is `minute` by default.

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
