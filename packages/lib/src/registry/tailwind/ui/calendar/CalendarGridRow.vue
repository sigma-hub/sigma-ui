<script lang="ts" setup>
import { useAttrs } from 'vue';

import { CalendarGridRow, type CalendarGridRowProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<CalendarGridRowProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarGridRow
    data-slot="calendar-grid-row"
    v-bind="{ ...forwardedProps, ...delegatedAttrs() }"
    :class="cn('flex', $attrs.class ?? '')"
  >
    <slot />
  </CalendarGridRow>
</template>
