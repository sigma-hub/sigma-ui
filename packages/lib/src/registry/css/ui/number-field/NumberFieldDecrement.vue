<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { NumberFieldDecrementProps } from 'reka-ui';
import { NumberFieldDecrement, useForwardProps } from 'reka-ui';
import { MinusIcon } from 'lucide-vue-next';
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
    data-slot="decrement"
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    class="sigma-ui-number-field-decrement"
    :class="[$attrs.class]"
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
  padding: 0.75rem;
  transform: translateY(-50%);
}

.sigma-ui-number-field-decrement:disabled {
  cursor: not-allowed;
  opacity: 0.2;
}

.sigma-ui-number-field-decrement__icon {
  width: 1rem;
  height: 1rem;
}
</style>
