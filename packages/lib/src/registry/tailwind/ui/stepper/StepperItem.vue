<script setup lang="ts">
import { StepperItem, type StepperItemProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
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
    v-bind="{ ...forwarded, ...$attrs }"
    :class="cn('group flex items-center gap-2 data-[disabled]:pointer-events-none', $attrs.class ?? '')"
  >
    <slot v-bind="slotProps" />
  </StepperItem>
</template>
