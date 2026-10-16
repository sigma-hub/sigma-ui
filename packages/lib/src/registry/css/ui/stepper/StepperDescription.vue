<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { StepperDescription, type StepperDescriptionProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

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
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    class="sigma-ui-stepper-description"
    :class="[$attrs.class]"
  >
    <slot />
  </StepperDescription>
</template>

<style>
.sigma-ui-stepper-description {
  color: var(--muted-foreground);
  font-size: 0.75rem;
}
</style>
