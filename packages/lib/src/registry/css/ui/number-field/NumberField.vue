<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { NumberFieldRootEmits, NumberFieldRootProps } from 'reka-ui';
import { NumberFieldRoot, useForwardPropsEmits } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<NumberFieldRootProps>();
const emits = defineEmits<NumberFieldRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <NumberFieldRoot
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    class="sigma-ui-number-field"
    data-slot="number-field"
    :class="[$attrs.class]"
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
