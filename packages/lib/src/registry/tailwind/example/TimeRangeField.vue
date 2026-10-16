<script setup lang="ts">
import { Time } from '@internationalized/date';
import type { SegmentPart, TimeValue } from 'reka-ui';
import { type Ref, ref } from 'vue';
import { TimeRangeField, TimeRangeFieldInput } from '@ui/registry/tailwind/ui/time-range-field';

const value = ref({
  start: new Time(9, 0),
  end: new Time(17, 0),
}) as Ref<{ start: TimeValue; end: TimeValue }>;

function segmentPart(part: string): SegmentPart {
  return part as SegmentPart;
}
</script>

<template>
  <TimeRangeField
    v-slot="{ segments }"
    v-model="value"
  >
    <template
      v-for="(item, index) in segments.start"
      :key="`start-${item.part}-${index}`"
    >
      <TimeRangeFieldInput
        :part="segmentPart(item.part)"
        type="start"
      >
        {{ item.value }}
      </TimeRangeFieldInput>
    </template>
    <span class="text-muted-foreground">to</span>
    <template
      v-for="(item, index) in segments.end"
      :key="`end-${item.part}-${index}`"
    >
      <TimeRangeFieldInput
        :part="segmentPart(item.part)"
        type="end"
      >
        {{ item.value }}
      </TimeRangeFieldInput>
    </template>
  </TimeRangeField>
</template>
