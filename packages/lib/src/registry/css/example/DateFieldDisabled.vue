<script setup lang="ts">
import { CalendarDate, type DateValue } from '@internationalized/date';
import { type Ref, ref } from 'vue';
import { DateField } from '@ui/registry/css/ui/date-field';

const value = ref(new CalendarDate(2026, 10, 18)) as Ref<DateValue>;
</script>

<template>
  <DateField
    v-model="value"
    disabled
  />
</template>
