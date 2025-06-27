<script lang="ts" setup>
import { RangeCalendarGridRow, type RangeCalendarGridRowProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<RangeCalendarGridRowProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarGridRow
    :class="cn('flex mt-2 w-full', $attrs.class ?? '')"
    v-bind="forwardedProps"
  >
    <slot />
  </RangeCalendarGridRow>
</template>
