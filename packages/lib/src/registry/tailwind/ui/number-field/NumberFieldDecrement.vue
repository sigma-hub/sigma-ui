<script setup lang="ts">
import type { NumberFieldDecrementProps } from 'reka-ui';
import { NumberFieldDecrement, useForwardProps } from 'reka-ui';
import { MinusIcon } from 'lucide-vue-next';
import { cn } from '@ui/utils';

const props = defineProps<NumberFieldDecrementProps>();

const forwarded = useForwardProps(props);
</script>

<template>
  <NumberFieldDecrement
    data-slot="decrement"
    v-bind="forwarded"
    :class="cn('absolute top-1/2 -translate-y-1/2 left-0 p-3 disabled:cursor-not-allowed disabled:opacity-20', $attrs.class ?? '')"
  >
    <slot>
      <MinusIcon class="h-4 w-4" />
    </slot>
  </NumberFieldDecrement>
</template>
