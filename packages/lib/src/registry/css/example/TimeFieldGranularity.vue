<script setup lang="ts">
import { Time } from '@internationalized/date';
import { type TimeValue } from 'reka-ui';
import { type Ref, ref } from 'vue';
import { TimeField } from '@ui/registry/css/ui/time-field';
import { Field, FieldDescription, FieldLabel } from '@ui/registry/css/ui/field';

const value = ref(new Time(14, 30, 15)) as Ref<TimeValue>;
</script>

<template>
  <Field class="example-sigma-ui-time-field-granularity">
    <FieldLabel for="time-field-lap">
      Lap time
    </FieldLabel>
    <TimeField
      id="time-field-lap"
      v-model="value"
      granularity="second"
      :hour-cycle="24"
    />
    <FieldDescription>
      Second granularity with a 24-hour clock.
    </FieldDescription>
  </Field>
</template>

<style>
@layer base, components;

@layer components {
  .example-sigma-ui-time-field-granularity {
    max-width: 20rem;
  }
}
</style>
