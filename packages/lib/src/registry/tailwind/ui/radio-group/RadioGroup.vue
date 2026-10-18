<script setup lang="ts">
import { useAttrs } from 'vue';

import { RadioGroupRoot, type RadioGroupRootEmits, type RadioGroupRootProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<RadioGroupRootProps>();
const emits = defineEmits<RadioGroupRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <RadioGroupRoot
    data-slot="radio-group"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn('grid gap-2', $attrs.class ?? '')"
  >
    <slot />
  </RadioGroupRoot>
</template>
