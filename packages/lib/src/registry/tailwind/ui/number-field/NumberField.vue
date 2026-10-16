<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { NumberFieldRootEmits, NumberFieldRootProps } from 'reka-ui';
import { NumberFieldRoot, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';
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
    :class="cn('grid gap-1.5', $attrs.class ?? '')"
    data-slot="number-field"
  >
    <slot />
  </NumberFieldRoot>
</template>
