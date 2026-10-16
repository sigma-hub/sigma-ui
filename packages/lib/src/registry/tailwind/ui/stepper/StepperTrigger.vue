<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { StepperTrigger, type StepperTriggerProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

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
    :class="cn('flex flex-col items-center gap-1 rounded-md p-1 text-center', $attrs.class ?? '')"
  >
    <slot />
  </StepperTrigger>
</template>
