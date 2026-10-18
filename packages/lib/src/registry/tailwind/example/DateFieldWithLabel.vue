<script setup lang="ts">
import { type DateValue } from '@internationalized/date';
import { ref } from 'vue';
import { DateField } from '@ui/registry/tailwind/ui/date-field';
import { Field, FieldDescription, FieldLabel } from '@ui/registry/tailwind/ui/field';

const value = ref<DateValue>();
</script>

<template>
  <Field class="max-w-xs">
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
