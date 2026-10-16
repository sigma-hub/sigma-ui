<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { StepperTrigger, type StepperTriggerProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

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
    v-bind="{ ...forwarded, ...delegatedAttrs }"
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
  padding: 0.25rem;
  border-radius: var(--radius-md);
  gap: 0.25rem;
  text-align: center;
}
</style>
