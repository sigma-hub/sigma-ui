<script setup lang="ts">
import { computed, ref } from 'vue';
import { Field, FieldDescription, FieldError, FieldLabel } from '@ui/registry/css/ui/field';
import { Input } from '@ui/registry/css/ui/input';

const password = ref('short');

const errors = computed(() => {
  const value = String(password.value);
  return [
    value.length < 8 ? 'Use at least 8 characters.' : undefined,
    /\d/.test(value) ? undefined : 'Include at least one number.',
  ];
});

const isInvalid = computed(() => errors.value.some(Boolean));
</script>

<template>
  <Field
    :invalid="isInvalid"
    class="example-field-invalid"
  >
    <FieldLabel for="field-invalid-password">
      Password
    </FieldLabel>
    <Input
      id="field-invalid-password"
      v-model="password"
      autocomplete="new-password"
      type="password"
      :aria-invalid="isInvalid"
    />
    <FieldDescription v-if="!isInvalid">
      Looks good.
    </FieldDescription>
    <FieldError :errors="errors" />
  </Field>
</template>

<style>
.example-field-invalid {
  max-width: 24rem;
}
</style>
