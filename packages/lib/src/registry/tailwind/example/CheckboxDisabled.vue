<script setup lang="ts">
import { ref } from 'vue';
import { Checkbox } from '@ui/registry/tailwind/ui/checkbox';

const termsAccepted = ref<boolean | 'indeterminate'>(false);
</script>

<template>
  <Checkbox
    id="checkbox-disabled-1"
    label="Accept terms and conditions"
    description="You agree to our Terms of Service and Privacy Policy."
    disabled
    :model-value="termsAccepted"
    @update:model-value="termsAccepted = $event"
  />
</template>
