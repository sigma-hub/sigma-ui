<script setup lang="ts">
import { useAttrs } from 'vue';

import { StepperIndicator, type StepperIndicatorProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

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
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-stepper-indicator"
    :class="[$attrs.class]"
  >
    <slot v-bind="slotProps" />
  </StepperIndicator>
</template>

<style>
@layer components {
  .sigma-ui-stepper-indicator {
    display: inline-flex;
    width: calc(var(--spacing) * 8);
    height: calc(var(--spacing) * 8);
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    color: color-mix(in oklch, var(--muted-foreground) 50%, transparent);
  }

  .sigma-ui-stepper-item[data-disabled] .sigma-ui-stepper-indicator {
    opacity: 0.5;
  }

  .sigma-ui-stepper-item[data-state="active"] .sigma-ui-stepper-indicator {
    background-color: var(--primary);
    color: var(--primary-foreground);
  }

  .sigma-ui-stepper-item[data-state="completed"] .sigma-ui-stepper-indicator {
    background-color: var(--accent);
    color: var(--accent-foreground);
  }
}
</style>
