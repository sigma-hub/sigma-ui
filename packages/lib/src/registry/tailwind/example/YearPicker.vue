<script setup lang="ts">
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date';
import { type Ref, ref } from 'vue';
import { YearPicker } from '@ui/registry/tailwind/ui/year-picker';

const value = ref(today(getLocalTimeZone())) as Ref<DateValue>;
</script>

<template>
  <YearPicker v-model="value" />
</template>
