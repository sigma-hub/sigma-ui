<script setup lang="ts">
import { type TimeValue } from 'reka-ui';
import { ref } from 'vue';
import { TimeField } from '@ui/registry/css/ui/time-field';
import { Field, FieldDescription, FieldLabel } from '@ui/registry/css/ui/field';

const value = ref<TimeValue>();
</script>

<template>
  <Field class="example-sigma-ui-time-field-with-label">
    <FieldLabel for="time-field-alarm">
      Alarm
    </FieldLabel>
    <TimeField
      id="time-field-alarm"
      v-model="value"
    />
    <FieldDescription>
      Type the hour and minute.
    </FieldDescription>
  </Field>
</template>

<style>
@layer components {
  .example-sigma-ui-time-field-with-label {
    max-width: 20rem;
  }
}
</style>
