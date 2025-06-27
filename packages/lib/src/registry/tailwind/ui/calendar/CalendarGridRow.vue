<script lang="ts" setup>
import { CalendarGridRow, type CalendarGridRowProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<CalendarGridRowProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarGridRow
    :class="cn('flex', $attrs.class ?? '')"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarGridRow>
</template>
