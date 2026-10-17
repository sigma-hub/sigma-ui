<script lang="ts" setup>
import { useAttrs } from 'vue';

import { RangeCalendarGridRow, type RangeCalendarGridRowProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<RangeCalendarGridRowProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarGridRow
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="cn('flex mt-2 w-full', $attrs.class ?? '')"
    data-slot="range-calendar-grid-row"
  >
    <slot />
  </RangeCalendarGridRow>
</template>
