<script setup lang="ts">
import { useAttrs } from 'vue';

import type { NumberFieldDecrementProps } from 'reka-ui';
import { NumberFieldDecrement, useForwardProps } from 'reka-ui';
import { MinusIcon } from '@lucide/vue';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<NumberFieldDecrementProps>();

const forwarded = useForwardProps(props);
</script>

<template>
  <NumberFieldDecrement
    data-slot="decrement"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-number-field-decrement"
    :class="[$attrs.class]"
  >
    <slot>
      <MinusIcon class="sigma-ui-number-field-decrement__icon" />
    </slot>
  </NumberFieldDecrement>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-number-field-decrement {
    position: absolute;
    top: 50%;
    left: 0;
    padding: calc(var(--spacing) * 3);
    transform: translateY(-50%);
  }

  .sigma-ui-number-field-decrement:disabled {
    cursor: not-allowed;
    opacity: 0.2;
  }

  .sigma-ui-number-field-decrement__icon {
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
  }
}
</style>
