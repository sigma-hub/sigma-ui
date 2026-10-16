<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { StepperRoot, type StepperRootEmits, type StepperRootProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<StepperRootProps>();
const emits = defineEmits<StepperRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);

defineSlots<{
  /**
   * `StepperItem` elements. Receives the active step.
   */
  default?: (props: { modelValue?: number }) => unknown;
}>();
</script>

<template>
  <StepperRoot
    v-slot="slotProps"
    data-slot="stepper"
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="cn('flex gap-2', $attrs.class ?? '')"
  >
    <slot v-bind="slotProps" />
  </StepperRoot>
</template>
