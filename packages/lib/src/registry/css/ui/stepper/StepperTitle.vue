<script setup lang="ts">
import { useAttrs } from 'vue';

import { StepperTitle, type StepperTitleProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

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
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
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
