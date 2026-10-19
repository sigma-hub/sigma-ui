<script setup lang="ts">
import { Time } from '@internationalized/date';
import type { TimeValue } from 'reka-ui';
import { type Ref, ref } from 'vue';
import { TimeRangeField } from '@ui/registry/css/ui/time-range-field';

const value = ref({
  start: new Time(9, 0),
  end: new Time(17, 0),
}) as Ref<{ start: TimeValue; end: TimeValue }>;
</script>

<template>
  <TimeRangeField v-model="value" />
</template>
