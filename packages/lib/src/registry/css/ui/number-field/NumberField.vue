<script setup lang="ts">
import type { NumberFieldRootEmits, NumberFieldRootProps } from 'reka-ui';
import { NumberFieldRoot, useForwardPropsEmits } from 'reka-ui';

const props = defineProps<NumberFieldRootProps>();
const emits = defineEmits<NumberFieldRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <NumberFieldRoot
    v-bind="forwarded"
    class="sigma-ui-number-field"
  >
    <slot />
  </NumberFieldRoot>
</template>

<style>
.sigma-ui-number-field {
  display: grid;
  gap: 0.375rem;
}
</style>
