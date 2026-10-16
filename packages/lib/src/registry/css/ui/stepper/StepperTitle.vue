<script setup lang="ts">
import { StepperTitle, type StepperTitleProps, useForwardProps } from 'reka-ui';

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
    class="sigma-ui-stepper-title"
    :class="[$attrs.class]"
  >
    <slot />
  </StepperTitle>
</template>

<style>
.sigma-ui-stepper-title {
  font-size: 0.875rem;
  font-weight: 600;
  white-space: nowrap;
}
</style>
