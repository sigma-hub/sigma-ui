<script lang="ts" setup>
import { RangeCalendarHeadCell, type RangeCalendarHeadCellProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<RangeCalendarHeadCellProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarHeadCell
    :class="cn('w-8 rounded-md text-[0.8rem] font-normal text-muted-foreground', $attrs.class ?? '')"
    v-bind="forwardedProps"
  >
    <slot />
  </RangeCalendarHeadCell>
</template>
