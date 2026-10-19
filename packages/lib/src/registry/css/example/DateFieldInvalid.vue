<script setup lang="ts">
import { CalendarDate, type DateValue, getLocalTimeZone, today } from '@internationalized/date';
import { computed, type Ref, ref } from 'vue';
import { DateField } from '@ui/registry/css/ui/date-field';
import { Field, FieldDescription, FieldError, FieldLabel } from '@ui/registry/css/ui/field';

const value = ref(new CalendarDate(2020, 1, 1)) as Ref<DateValue>;

const isInvalid = computed(() => !!value.value && value.value.compare(today(getLocalTimeZone())) < 0);
</script>

<template>
  <Field
    class="example-sigma-ui-date-field-invalid"
    :invalid="isInvalid"
  >
    <FieldLabel for="date-field-start">
      Start date
    </FieldLabel>
    <DateField
      id="date-field-start"
      v-model="value"
      :aria-invalid="isInvalid"
    />
    <FieldDescription v-if="!isInvalid">
      Looks good.
    </FieldDescription>
    <FieldError :errors="[isInvalid ? 'The start date can\'t be in the past.' : undefined]" />
  </Field>
</template>

<style>
@layer base, components;

@layer components {
  .example-sigma-ui-date-field-invalid {
    max-width: 20rem;
  }
}
</style>
