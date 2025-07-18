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
  color: hsl(var(--destructive));
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1.25rem;
}
</style>
