<script setup lang="ts">
import { Time } from '@internationalized/date';
import { ref } from 'vue';
import { TimeRangeField, TimeRangeFieldInput } from '@ui/registry/css/ui/time-range-field';

const value = ref({
  start: new Time(9, 0),
  end: new Time(17, 0),
});
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
        :part="item.part"
        type="start"
      >
        {{ item.value }}
      </TimeRangeFieldInput>
    </template>
    <span class="sigma-ui-time-range-example__to">to</span>
    <template
      v-for="(item, index) in segments.end"
      :key="`end-${item.part}-${index}`"
    >
      <TimeRangeFieldInput
        :part="item.part"
        type="end"
      >
        {{ item.value }}
      </TimeRangeFieldInput>
    </template>
  </TimeRangeField>
</template>

<style>
.sigma-ui-time-range-example__to {
  color: var(--muted-foreground);
}
</style>
