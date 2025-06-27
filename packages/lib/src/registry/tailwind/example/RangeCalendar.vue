<script setup lang="ts">
import { type Ref, ref } from 'vue';
import type { DateRange } from 'reka-ui';
import { getLocalTimeZone, today } from '@internationalized/date';
import { RangeCalendar } from '@ui/registry/tailwind/ui/range-calendar';

const start = today(getLocalTimeZone());
const end = start.add({ days: 7 });

const value = ref({
  start,
  end,
}) as Ref<DateRange>;
</script>

<template>
  <RangeCalendar
    v-model="value"
    class="rounded-md border"
  />
</template>
