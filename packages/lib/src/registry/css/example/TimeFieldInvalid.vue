<script setup lang="ts">
import { Time } from '@internationalized/date';
import { type TimeValue } from 'reka-ui';
import { computed, type Ref, ref } from 'vue';
import { TimeField } from '@ui/registry/css/ui/time-field';
import { Field, FieldDescription, FieldError, FieldLabel } from '@ui/registry/css/ui/field';

const value = ref(new Time(7, 15)) as Ref<TimeValue>;
const opensAt = new Time(9);

const isInvalid = computed(() => !!value.value && (value.value as Time).compare(opensAt) < 0);
</script>

<template>
  <Field
    class="example-sigma-ui-time-field-invalid"
    :invalid="isInvalid"
  >
    <FieldLabel for="time-field-pickup">
      Pickup time
    </FieldLabel>
    <TimeField
      id="time-field-pickup"
      v-model="value"
      :aria-invalid="isInvalid"
    />
    <FieldDescription v-if="!isInvalid">
      Looks good.
    </FieldDescription>
    <FieldError :errors="[isInvalid ? 'The store opens at 9:00 AM.' : undefined]" />
  </Field>
</template>

<style>
@layer base, components;

@layer components {
  .example-sigma-ui-time-field-invalid {
    max-width: 20rem;
  }
}
</style>
