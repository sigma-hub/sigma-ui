<script setup lang="ts">
import { CalendarDateTime, type DateValue } from '@internationalized/date';
import { type Ref, ref } from 'vue';
import { DateField } from '@ui/registry/css/ui/date-field';
import { Field, FieldDescription, FieldLabel } from '@ui/registry/css/ui/field';

const value = ref(new CalendarDateTime(2026, 10, 18, 14, 30)) as Ref<DateValue>;
</script>

<template>
  <Field class="example-sigma-ui-date-field-granularity">
    <FieldLabel for="date-field-departure">
      Departure
    </FieldLabel>
    <DateField
      id="date-field-departure"
      v-model="value"
      granularity="minute"
      :hour-cycle="24"
    />
    <FieldDescription>
      Minute granularity with a 24-hour clock.
    </FieldDescription>
  </Field>
</template>

<style>
@layer components {
  .example-sigma-ui-date-field-granularity {
    max-width: 20rem;
  }
}
</style>
