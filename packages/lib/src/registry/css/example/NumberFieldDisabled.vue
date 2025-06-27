<script setup lang="ts">
import { ref } from 'vue';
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@ui/registry/css/ui/number-field';
import { Label } from '@ui/registry/css/ui/label';

const model = ref(18);
</script>

<template>
  <NumberField
    id="age-disabled"
    v-model="model"
    disabled
  >
    <Label for="age-disabled">Age</Label>
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
