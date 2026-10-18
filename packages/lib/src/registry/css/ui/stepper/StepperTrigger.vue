<script setup lang="ts">
import { useAttrs } from 'vue';

import { StepperTrigger, type StepperTriggerProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<StepperTriggerProps>();
const forwarded = useForwardProps(props);

defineSlots<{
  /**
   * Indicator and labels for one step.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <StepperTrigger
    data-slot="stepper-trigger"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-stepper-trigger"
    :class="[$attrs.class]"
  >
    <slot />
  </StepperTrigger>
</template>

<style>
.sigma-ui-stepper-trigger {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: calc(var(--spacing) * 1);
  border-radius: var(--radius-md);
  gap: calc(var(--spacing) * 1);
  text-align: center;
}
</style>
