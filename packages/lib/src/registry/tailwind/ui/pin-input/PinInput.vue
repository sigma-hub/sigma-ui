<script setup lang="ts" generic="Type extends 'text' | 'number' = 'text'">
import { useAttrs } from 'vue';

import { PinInputRoot, type PinInputRootEmits, type PinInputRootProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(defineProps<PinInputRootProps<Type>>(), {
  modelValue: () => [],
});
const emits = defineEmits<PinInputRootEmits<Type>>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <PinInputRoot
    data-slot="pin-input"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn('flex gap-2 items-center', $attrs.class ?? '')"
  >
    <slot />
  </PinInputRoot>
</template>
