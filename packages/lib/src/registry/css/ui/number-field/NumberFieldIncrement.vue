<script setup lang="ts">
import { useAttrs } from 'vue';

import type { NumberFieldIncrementProps } from 'reka-ui';
import { NumberFieldIncrement, useForwardProps } from 'reka-ui';
import { PlusIcon } from 'lucide-vue-next';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<NumberFieldIncrementProps>();

const forwarded = useForwardProps(props);
</script>

<template>
  <NumberFieldIncrement
    data-slot="increment"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-number-field-increment"
    :class="[$attrs.class]"
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
  padding: 0.75rem;
  transform: translateY(-50%);
}

.sigma-ui-number-field-increment:disabled {
  cursor: not-allowed;
  opacity: 0.2;
}

.sigma-ui-number-field-increment__icon {
  width: 1rem;
  height: 1rem;
}
</style>
