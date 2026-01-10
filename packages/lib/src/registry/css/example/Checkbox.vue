<script setup lang="ts">
import { ref } from 'vue';
import { Checkbox } from '@ui/registry/css/ui/checkbox';

const termsAccepted = ref<boolean | 'indeterminate'>(false);
</script>

<template>
  <Checkbox
    id="checkbox-1"
    label="Accept terms and conditions"
    description="You agree to our Terms of Service and Privacy Policy."
    :model-value="termsAccepted"
    @update:model-value="termsAccepted = $event"
  />
</template>
