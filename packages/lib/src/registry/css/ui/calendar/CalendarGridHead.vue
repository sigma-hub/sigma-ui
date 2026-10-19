<script lang="ts" setup>
import { CalendarGridHead, type CalendarGridHeadProps } from 'reka-ui';

const props = defineProps<CalendarGridHeadProps>();
</script>

<template>
  <CalendarGridHead
    data-slot="calendar-grid-head"
    v-bind="props"
  >
    <slot />
  </CalendarGridHead>
</template>
