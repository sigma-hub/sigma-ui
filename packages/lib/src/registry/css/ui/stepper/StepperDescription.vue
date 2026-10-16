<script setup lang="ts">
import { StepperDescription, type StepperDescriptionProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
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
    v-bind="{ ...forwarded, ...$attrs }"
    class="sigma-ui-stepper-description"
    :class="[$attrs.class]"
  >
    <slot />
  </StepperDescription>
</template>

<style>
.sigma-ui-stepper-description {
  color: hsl(var(--muted-foreground));
  font-size: 0.75rem;
}
</style>
