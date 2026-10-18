<script setup lang="ts">
import { CalendarDate, type DateValue } from '@internationalized/date';
import { type Ref, ref } from 'vue';
import { DateField } from '@ui/registry/css/ui/date-field';
import { Field, FieldDescription, FieldLabel } from '@ui/registry/css/ui/field';

const value = ref(new CalendarDate(2026, 10, 18)) as Ref<DateValue>;
const minValue = new CalendarDate(2026, 1, 1);
const maxValue = new CalendarDate(2026, 12, 31);
</script>

<template>
  <Field class="example-sigma-ui-date-field-min-max">
    <FieldLabel for="date-field-event">
      Event date
    </FieldLabel>
    <DateField
      id="date-field-event"
      v-model="value"
      :min-value="minValue"
      :max-value="maxValue"
    />
    <FieldDescription>
      Any day in 2026. A date outside the range is marked invalid.
    </FieldDescription>
  </Field>
</template>

<style>
.example-sigma-ui-date-field-min-max {
  max-width: 20rem;
}
</style>
