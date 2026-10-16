<script setup lang="ts">
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date';
import { type Ref, ref } from 'vue';
import { MonthPicker } from '@ui/registry/tailwind/ui/month-picker';

const value = ref(today(getLocalTimeZone())) as Ref<DateValue>;
</script>

<template>
  <MonthPicker v-model="value" />
</template>
