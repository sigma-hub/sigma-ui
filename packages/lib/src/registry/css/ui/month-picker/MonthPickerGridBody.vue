<script lang="ts" setup>
import { MonthPickerGridBody, type MonthPickerGridBodyProps } from 'reka-ui';

const props = defineProps<MonthPickerGridBodyProps>();
</script>

<template>
  <MonthPickerGridBody
    data-slot="month-picker-grid-body"
    v-bind="props"
  >
    <slot />
  </MonthPickerGridBody>
</template>
