<script setup lang="ts">
import { ref } from 'vue';
import {
  NumberField,
  NumberFieldContent,
  NumberFieldDecrement,
  NumberFieldIncrement,
  NumberFieldInput,
} from '@ui/registry/tailwind/ui/number-field';
import { Label } from '@ui/registry/tailwind/ui/label';

const model = ref(5);
</script>

<template>
  <NumberField
    id="number"
    v-model="model"
    :format-options="{
      signDisplay: 'exceptZero',
      minimumFractionDigits: 1,
    }"
  >
    <Label for="number">Number</Label>
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
