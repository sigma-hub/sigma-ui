<script setup lang="ts" generic="Type extends 'text' | 'number' = 'text'">
import { PinInputRoot, type PinInputRootEmits, type PinInputRootProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';

const props = withDefaults(defineProps<PinInputRootProps<Type>>(), {
  modelValue: () => [],
});
const emits = defineEmits<PinInputRootEmits<Type>>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <PinInputRoot
    v-bind="forwarded"
    :class="cn('flex gap-2 items-center', $attrs.class ?? '')"
  >
    <slot />
  </PinInputRoot>
</template>
