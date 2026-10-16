<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { StepperSeparator, type StepperSeparatorProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

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
    :class="cn(
      'bg-muted group-data-[disabled]:opacity-50 data-[state=completed]:bg-accent',
      'data-[orientation=horizontal]:h-px data-[orientation=horizontal]:flex-1',
      'data-[orientation=vertical]:w-px data-[orientation=vertical]:flex-1',
      $attrs.class ?? '',
    )"
  />
</template>
