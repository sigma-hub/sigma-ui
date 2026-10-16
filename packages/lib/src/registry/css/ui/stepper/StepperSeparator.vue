<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { StepperSeparator, type StepperSeparatorProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<StepperSeparatorProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <StepperSeparator
    data-slot="stepper-separator"
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    class="sigma-ui-stepper-separator"
    :class="[$attrs.class]"
  />
</template>

<style>
.sigma-ui-stepper-separator {
  flex: 1;
  background-color: var(--muted);
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
  background-color: var(--accent);
}
</style>
