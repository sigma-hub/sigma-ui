<script setup lang="ts">
import { StepperIndicator, type StepperIndicatorProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

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
    v-bind="{ ...forwarded, ...$attrs }"
    class="sigma-ui-stepper-indicator"
    :class="[$attrs.class]"
  >
    <slot v-bind="slotProps" />
  </StepperIndicator>
</template>

<style>
.sigma-ui-stepper-indicator {
  display: inline-flex;
  width: 2rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: 9999px;
  color: hsl(var(--muted-foreground) / 50%);
}

.sigma-ui-stepper-item[data-disabled] .sigma-ui-stepper-indicator {
  opacity: 0.5;
}

.sigma-ui-stepper-item[data-state="active"] .sigma-ui-stepper-indicator {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
}

.sigma-ui-stepper-item[data-state="completed"] .sigma-ui-stepper-indicator {
  background-color: hsl(var(--secondary));
  color: hsl(var(--secondary-foreground));
}
</style>
