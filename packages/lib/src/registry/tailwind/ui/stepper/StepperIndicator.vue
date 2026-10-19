<script setup lang="ts">
import { useAttrs } from 'vue';

import { StepperIndicator, type StepperIndicatorProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<StepperIndicatorProps>();
const forwarded = useForwardProps(props);

defineSlots<{
  /**
   * Step number or icon. Receives the current step index.
   */
  default?: (props: { step: number }) => unknown;
}>();
</script>

<template>
  <StepperIndicator
    v-slot="slotProps"
    data-slot="stepper-indicator"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn(
      'inline-flex size-8 items-center justify-center rounded-full text-muted-foreground/50',
      'group-data-[disabled]:opacity-50',
      'group-data-[state=active]:bg-primary group-data-[state=active]:text-primary-foreground',
      'group-data-[state=completed]:bg-accent group-data-[state=completed]:text-accent-foreground',
      $attrs.class ?? '',
    )"
  >
    <slot v-bind="slotProps" />
  </StepperIndicator>
</template>
