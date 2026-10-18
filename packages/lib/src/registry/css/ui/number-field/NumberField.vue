<script setup lang="ts">
import { useAttrs } from 'vue';

import type { NumberFieldRootEmits, NumberFieldRootProps } from 'reka-ui';
import { NumberFieldRoot, useForwardPropsEmits } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<NumberFieldRootProps>();
const emits = defineEmits<NumberFieldRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <NumberFieldRoot
    data-slot="number-field"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-number-field"
    :class="[$attrs.class]"
  >
    <slot />
  </NumberFieldRoot>
</template>

<style>
.sigma-ui-number-field {
  display: grid;
  gap: calc(var(--spacing) * 1.5);
}
</style>
