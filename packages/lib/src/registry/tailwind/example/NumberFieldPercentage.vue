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

const model = ref(0.05);
</script>

<template>
  <NumberField
    id="percent"
    v-model="model"
    :step="0.01"
    :format-options="{
      style: 'percent',
    }"
  >
    <Label for="percent">Percent</Label>
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
