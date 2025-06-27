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

const model = ref(1500);
</script>

<template>
  <NumberField
    id="balance"
    v-model="model"
    :format-options="{
      style: 'currency',
      currency: 'EUR',
      currencyDisplay: 'code',
      currencySign: 'accounting',
    }"
  >
    <Label for="balance">Balance</Label>
    <NumberFieldContent>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldContent>
  </NumberField>
</template>
