<script setup lang="ts">
import { Time } from '@internationalized/date';
import { type TimeValue } from 'reka-ui';
import { type Ref, ref } from 'vue';
import { TimeField } from '@ui/registry/css/ui/time-field';
import { Field, FieldDescription, FieldLabel } from '@ui/registry/css/ui/field';

const value = ref(new Time(10, 30)) as Ref<TimeValue>;
const minValue = new Time(9);
const maxValue = new Time(17);
</script>

<template>
  <Field class="example-sigma-ui-time-field-min-max">
    <FieldLabel for="time-field-meeting">
      Meeting
    </FieldLabel>
    <TimeField
      id="time-field-meeting"
      v-model="value"
      :min-value="minValue"
      :max-value="maxValue"
    />
    <FieldDescription>
      Between 9:00 AM and 5:00 PM. A time outside the range is marked invalid.
    </FieldDescription>
  </Field>
</template>

<style>
@layer components {
  .example-sigma-ui-time-field-min-max {
    max-width: 20rem;
  }
}
</style>
