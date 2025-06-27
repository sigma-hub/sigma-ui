<script setup lang="ts">
import type { NumberFieldDecrementProps } from 'reka-ui';
import { NumberFieldDecrement, useForwardProps } from 'reka-ui';
import { MinusIcon } from 'lucide-vue-next';

const props = defineProps<NumberFieldDecrementProps>();

const forwarded = useForwardProps(props);
</script>

<template>
  <NumberFieldDecrement
    data-slot="decrement"
    v-bind="forwarded"
    class="sigma-ui-number-field-decrement"
  >
    <slot>
      <MinusIcon class="sigma-ui-number-field-decrement__icon" />
    </slot>
  </NumberFieldDecrement>
</template>

<style>
.sigma-ui-number-field-decrement {
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  padding: 0.75rem;
}

.sigma-ui-number-field-decrement:disabled {
  cursor: not-allowed;
  opacity: 0.2;
}

.sigma-ui-number-field-decrement__icon {
  height: 1rem;
  width: 1rem;
}
</style>
