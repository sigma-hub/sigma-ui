<script setup lang="ts">
import { type DateValue } from '@internationalized/date';
import { ref } from 'vue';
import { DateField } from '@ui/registry/tailwind/ui/date-field';

const value = ref<DateValue>();
</script>

<template>
  <DateField v-model="value" />
</template>
