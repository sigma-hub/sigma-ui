<script setup lang="ts">
import type { NumberFieldIncrementProps } from 'reka-ui';
import { NumberFieldIncrement, useForwardProps } from 'reka-ui';
import { PlusIcon } from 'lucide-vue-next';

const props = defineProps<NumberFieldIncrementProps>();

const forwarded = useForwardProps(props);
</script>

<template>
  <NumberFieldIncrement
    data-slot="increment"
    v-bind="forwarded"
    class="sigma-ui-number-field-increment"
  >
    <slot>
      <PlusIcon class="sigma-ui-number-field-increment__icon" />
    </slot>
  </NumberFieldIncrement>
</template>

<style>
.sigma-ui-number-field-increment {
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  padding: 0.75rem;
}

.sigma-ui-number-field-increment:disabled {
  cursor: not-allowed;
  opacity: 0.2;
}

.sigma-ui-number-field-increment__icon {
  height: 1rem;
  width: 1rem;
}
</style>
