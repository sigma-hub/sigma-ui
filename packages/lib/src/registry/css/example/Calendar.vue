<script setup lang="ts">
import { type Ref, ref } from 'vue';
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date';
import { Calendar } from '@ui/registry/css/ui/calendar';

const value = ref(today(getLocalTimeZone())) as Ref<DateValue>;
</script>

<template>
  <Calendar
    v-model="value"
    :weekday-format="'short'"
    class="example-sigma-ui-calendar"
  />
</template>

<style>
.example-sigma-ui-calendar {
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius-md);
}
</style>
