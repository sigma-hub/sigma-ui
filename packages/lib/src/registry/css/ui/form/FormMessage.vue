<script lang="ts" setup>
import { ErrorMessage } from 'vee-validate';
import { toValue } from 'vue';
import { useFormField } from './useFormField';

const { name, formMessageId } = useFormField();
</script>

<template>
  <ErrorMessage
    :id="formMessageId"
    as="p"
    :name="toValue(name)"
    class="sigma-ui-form-message"
  />
</template>

<style>
.sigma-ui-form-message {
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: hsl(var(--destructive));
}
</style>
