<script setup lang="ts">
import { Checkbox } from '@ui/registry/tailwind/ui/checkbox';

defineProps<{
  modelValue: boolean | 'indeterminate';
  ariaLabel: string;
}>();

const emit = defineEmits<{
  'update:modelValue': [value: boolean | 'indeterminate'];
}>();

function updateValue(value: boolean | 'indeterminate') {
  emit('update:modelValue', value);
}
</script>

<template>
  <Checkbox
    :model-value="modelValue"
    :aria-label="ariaLabel"
    @update:model-value="updateValue"
  />
</template>
