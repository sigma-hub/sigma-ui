<script setup lang="ts">
import { useAttrs } from 'vue';

import { StepperDescription, type StepperDescriptionProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<StepperDescriptionProps>();
const forwarded = useForwardProps(props);

defineSlots<{
  /**
   * Short explanation of the step.
   */
  default?: () => unknown;
}>();
</script>

<template>
  <StepperDescription
    data-slot="stepper-description"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn('text-xs text-muted-foreground', $attrs.class ?? '')"
  >
    <slot />
  </StepperDescription>
</template>
