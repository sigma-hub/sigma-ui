<script lang="ts" setup>
import { YearPickerGridBody, type YearPickerGridBodyProps } from 'reka-ui';

const props = defineProps<YearPickerGridBodyProps>();
</script>

<template>
  <YearPickerGridBody
    data-slot="year-picker-grid-body"
    v-bind="props"
  >
    <slot />
  </YearPickerGridBody>
</template>
