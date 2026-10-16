<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { NumberFieldIncrementProps } from 'reka-ui';
import { NumberFieldIncrement, useForwardProps } from 'reka-ui';
import { PlusIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<NumberFieldIncrementProps>();

const forwarded = useForwardProps(props);
</script>

<template>
  <NumberFieldIncrement
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    data-slot="increment"
    :class="cn('absolute top-1/2 -translate-y-1/2 right-0 disabled:cursor-not-allowed disabled:opacity-20 p-3', $attrs.class ?? '')"
  >
    <slot>
      <PlusIcon class="h-4 w-4" />
    </slot>
  </NumberFieldIncrement>
</template>
