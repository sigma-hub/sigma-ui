<script lang="ts" setup>
import { CalendarHeader, type CalendarHeaderProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<CalendarHeaderProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarHeader
    :class="cn('relative flex w-full items-center justify-between pt-1', $attrs.class ?? '')"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarHeader>
</template>
