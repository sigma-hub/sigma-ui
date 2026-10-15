<script lang="ts" setup>
import { CalendarGridHead, type CalendarGridHeadProps } from 'reka-ui';

const props = defineProps<CalendarGridHeadProps>();
</script>

<template>
  <CalendarGridHead v-bind="props"
  data-slot="calendar-grid-head">
    <slot />
  </CalendarGridHead>
</template>
