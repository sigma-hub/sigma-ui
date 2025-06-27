<script setup lang="ts">
import type { NumberFieldRootEmits, NumberFieldRootProps } from 'reka-ui';
import { NumberFieldRoot, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<NumberFieldRootProps>();
const emits = defineEmits<NumberFieldRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <NumberFieldRoot
    v-bind="forwarded"
    :class="cn('grid gap-1.5', $attrs.class ?? '')"
  >
    <slot />
  </NumberFieldRoot>
</template>
