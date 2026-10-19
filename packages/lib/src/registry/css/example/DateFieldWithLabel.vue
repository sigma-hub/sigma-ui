<script setup lang="ts">
import { type DateValue } from '@internationalized/date';
import { ref } from 'vue';
import { DateField } from '@ui/registry/css/ui/date-field';
import { Field, FieldDescription, FieldLabel } from '@ui/registry/css/ui/field';

const value = ref<DateValue>();
</script>

<template>
  <Field class="example-sigma-ui-date-field-with-label">
    <FieldLabel for="date-field-birthday">
      Birthday
    </FieldLabel>
    <DateField
      id="date-field-birthday"
      v-model="value"
    />
    <FieldDescription>
      Type the month, day, and year.
    </FieldDescription>
  </Field>
</template>

<style>
@layer components {
  .example-sigma-ui-date-field-with-label {
    max-width: 20rem;
  }
}
</style>
