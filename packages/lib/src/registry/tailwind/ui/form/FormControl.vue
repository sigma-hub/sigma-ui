<script lang="ts" setup>
import { Slot } from 'reka-ui';
import { useFormField } from './useFormField';

const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
</script>

<template>
  <Slot
    :id="formItemId"
    :aria-describedby="!error ? `${formDescriptionId}` : `${formDescriptionId} ${formMessageId}`"
    :aria-invalid="!!error"
    data-slot="form-control"
  >
    <slot />
  </Slot>
</template>
