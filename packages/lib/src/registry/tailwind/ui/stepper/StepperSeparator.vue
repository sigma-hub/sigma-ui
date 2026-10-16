<script setup lang="ts">
import { StepperSeparator, type StepperSeparatorProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<StepperSeparatorProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <StepperSeparator
    data-slot="stepper-separator"
    v-bind="{ ...forwarded, ...$attrs }"
    :class="cn(
      'bg-muted group-data-[disabled]:opacity-50 data-[state=completed]:bg-secondary',
      'data-[orientation=horizontal]:h-px data-[orientation=horizontal]:flex-1',
      'data-[orientation=vertical]:w-px data-[orientation=vertical]:flex-1',
      $attrs.class ?? '',
    )"
  />
</template>
