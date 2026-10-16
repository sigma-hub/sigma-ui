<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { RangeCalendarGridRow, type RangeCalendarGridRowProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<RangeCalendarGridRowProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <RangeCalendarGridRow
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    :class="cn('flex mt-2 w-full', $attrs.class ?? '')"
    data-slot="range-calendar-grid-row"
  >
    <slot />
  </RangeCalendarGridRow>
</template>
