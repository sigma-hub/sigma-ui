<script setup lang="ts" generic="Type extends 'text' | 'number' = 'text'">
import { computed, useAttrs } from 'vue';

import { PinInputRoot, type PinInputRootEmits, type PinInputRootProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = withDefaults(defineProps<PinInputRootProps<Type>>(), {
  modelValue: () => [],
});
const emits = defineEmits<PinInputRootEmits<Type>>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <PinInputRoot
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="cn('flex gap-2 items-center', $attrs.class ?? '')"
    data-slot="pin-input"
  >
    <slot />
  </PinInputRoot>
</template>
