<script setup lang="ts">
import { Time } from '@internationalized/date';
import { ref } from 'vue';
import { TimeRangeField, TimeRangeFieldInput } from '@ui/registry/tailwind/ui/time-range-field';

const value = ref({
  start: new Time(9, 0),
  end: new Time(17, 0),
});
</script>

<template>
  <TimeRangeField v-model="value">
    <TimeRangeFieldInput
      part="hour"
      type="start"
    />
    <span>:</span>
    <TimeRangeFieldInput
      part="minute"
      type="start"
    />
    <span class="text-muted-foreground">to</span>
    <TimeRangeFieldInput
      part="hour"
      type="end"
    />
    <span>:</span>
    <TimeRangeFieldInput
      part="minute"
      type="end"
    />
  </TimeRangeField>
</template>
