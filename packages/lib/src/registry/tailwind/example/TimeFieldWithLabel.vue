<script setup lang="ts">
import { type TimeValue } from 'reka-ui';
import { ref } from 'vue';
import { TimeField } from '@ui/registry/tailwind/ui/time-field';
import { Field, FieldDescription, FieldLabel } from '@ui/registry/tailwind/ui/field';

const value = ref<TimeValue>();
</script>

<template>
  <Field class="max-w-xs">
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
