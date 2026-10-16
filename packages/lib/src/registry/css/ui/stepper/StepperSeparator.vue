<script setup lang="ts">
import { StepperSeparator, type StepperSeparatorProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<StepperSeparatorProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <StepperSeparator
    data-slot="stepper-separator"
    v-bind="{ ...forwarded, ...$attrs }"
    class="sigma-ui-stepper-separator"
    :class="[$attrs.class]"
  />
</template>

<style>
.sigma-ui-stepper-separator {
  flex: 1;
  background-color: hsl(var(--muted));
}

.sigma-ui-stepper-separator[data-orientation="horizontal"] {
  height: 1px;
}

.sigma-ui-stepper-separator[data-orientation="vertical"] {
  width: 1px;
}

.sigma-ui-stepper-item[data-disabled] .sigma-ui-stepper-separator {
  opacity: 0.5;
}

.sigma-ui-stepper-separator[data-state="completed"] {
  background-color: hsl(var(--secondary));
}
</style>
