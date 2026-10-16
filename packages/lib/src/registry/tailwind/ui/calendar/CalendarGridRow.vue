<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { CalendarGridRow, type CalendarGridRowProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<CalendarGridRowProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarGridRow
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    :class="cn('flex', $attrs.class ?? '')"
    data-slot="calendar-grid-row"
  >
    <slot />
  </CalendarGridRow>
</template>
