<script lang="ts" setup>
import { CalendarCellTrigger, type CalendarCellTriggerProps, useForwardProps } from 'reka-ui';
import { buttonVariants } from '@ui/registry/tailwind/ui/button';
import { cn } from '@ui/utils';

const props = defineProps<CalendarCellTriggerProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <CalendarCellTrigger
    :class="cn(
      buttonVariants({ variant: 'ghost' }),
      'h-9 w-9 p-0 font-normal',
      '[&[data-today]:not([data-selected])]:bg-accent [&[data-today]:not([data-selected])]:text-accent-foreground',
      // Selected
      'data-[selected]:bg-primary data-[selected]:text-primary-foreground data-[selected]:opacity-100 data-[selected]:hover:bg-primary data-[selected]:hover:text-primary-foreground data-[selected]:focus:bg-primary data-[selected]:focus:text-primary-foreground',
      // Disabled
      'data-[disabled]:text-muted-foreground data-[disabled]:opacity-50',
      // Unavailable
      'data-[unavailable]:text-destructive-foreground data-[unavailable]:line-through',
      // Outside months
      'data-[outside-month]:pointer-events-none data-[outside-month]:text-muted-foreground data-[outside-month]:opacity-50 [&[data-outside-month][data-selected]]:bg-accent/50 [&[data-outside-month][data-selected]]:text-muted-foreground [&[data-outside-month][data-selected]]:opacity-30',
      $attrs.class ?? '',
    )"
    v-bind="forwardedProps"
  >
    <slot />
  </CalendarCellTrigger>
</template>
