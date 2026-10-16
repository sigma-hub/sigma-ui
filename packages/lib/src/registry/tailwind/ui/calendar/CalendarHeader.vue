<script lang="ts" setup>
import { computed, useAttrs } from 'vue';

import { CalendarHeader, type CalendarHeaderProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<CalendarHeaderProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarHeader
    v-bind="{ ...forwardedProps, ...delegatedAttrs }"
    :class="cn('relative flex w-full items-center justify-between pt-1', $attrs.class ?? '')"
    data-slot="calendar-header"
  >
    <slot />
  </CalendarHeader>
</template>
