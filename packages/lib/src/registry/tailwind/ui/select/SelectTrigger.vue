<script setup lang="ts">
import { SelectIcon, SelectTrigger, type SelectTriggerProps, useForwardProps } from 'reka-ui';
import { ChevronDownIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';

const props = defineProps<SelectTriggerProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <SelectTrigger
    v-bind="forwardedProps"
    :class="cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-border bg-input px-3 py-2 text-sm placeholder:text-muted-foreground focus:outline-2 focus:outline-ring focus:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1',
      $attrs.class ?? '',
    )"
  >
    <span class="break-all">
      <slot />
    </span>
    <SelectIcon as-child>
      <ChevronDownIcon class="w-4 h-4 ml-2 opacity-50" />
    </SelectIcon>
  </SelectTrigger>
</template>
