<script setup lang="ts">
import { ref } from 'vue';
import { Checkbox } from '@ui/registry/css/ui/checkbox';

const termsAccepted = ref<boolean | 'indeterminate'>(false);
</script>

<template>
  <Checkbox
    id="checkbox-basic-1"
    label="Accept terms and conditions"
    :model-value="termsAccepted"
    @update:model-value="termsAccepted = $event"
  />
</template>
