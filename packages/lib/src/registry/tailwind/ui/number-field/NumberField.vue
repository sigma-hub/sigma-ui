<script setup lang="ts">
import { useAttrs } from 'vue';

import type { NumberFieldRootEmits, NumberFieldRootProps } from 'reka-ui';
import { NumberFieldRoot, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';
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
    :class="cn('grid gap-1.5', $attrs.class ?? '')"
  >
    <slot />
  </NumberFieldRoot>
</template>
