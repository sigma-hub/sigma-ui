<script lang="ts" setup>
import { CalendarHeadCell, type CalendarHeadCellProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<CalendarHeadCellProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarHeadCell
    :class="cn('w-9 rounded-md text-[0.8rem] font-normal text-muted-foreground', $attrs.class ?? '')"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarHeadCell>
</template>
