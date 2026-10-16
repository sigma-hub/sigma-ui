<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { NumberFieldDecrementProps } from 'reka-ui';
import { NumberFieldDecrement, useForwardProps } from 'reka-ui';
import { MinusIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<NumberFieldDecrementProps>();

const forwarded = useForwardProps(props);
</script>

<template>
  <NumberFieldDecrement
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    data-slot="decrement"
    :class="cn('absolute top-1/2 -translate-y-1/2 left-0 p-3 disabled:cursor-not-allowed disabled:opacity-20', $attrs.class ?? '')"
  >
    <slot>
      <MinusIcon class="h-4 w-4" />
    </slot>
  </NumberFieldDecrement>
</template>
