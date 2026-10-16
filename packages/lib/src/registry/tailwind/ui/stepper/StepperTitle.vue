<script setup lang="ts">
import { StepperTitle, type StepperTitleProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<StepperTitleProps>();
const forwarded = useForwardProps(props);

defineSlots<{
  /**
   * Name of the step.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <StepperTitle
    data-slot="stepper-title"
    v-bind="{ ...forwarded, ...$attrs }"
    :class="cn('text-sm font-semibold whitespace-nowrap', $attrs.class ?? '')"
  >
    <slot />
  </StepperTitle>
</template>
