<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { StepperItem, type StepperItemProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<StepperItemProps>();
const forwarded = useForwardProps(props);

defineSlots<{
  /**
   * Trigger, indicator, title, and separator. Receives the step state.
   */
  default?: (props: { state: 'completed' | 'active' | 'inactive' }) => unknown;
}>();
</script>

<template>
  <StepperItem
    v-slot="slotProps"
    data-slot="stepper-item"
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    class="sigma-ui-stepper-item"
    :class="[$attrs.class]"
  >
    <slot v-bind="slotProps" />
  </StepperItem>
</template>

<style>
.sigma-ui-stepper-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sigma-ui-stepper-item[data-disabled] {
  pointer-events: none;
}
</style>
