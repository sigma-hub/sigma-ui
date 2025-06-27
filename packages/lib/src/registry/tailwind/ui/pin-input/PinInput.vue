<script setup lang="ts">
import { PinInputRoot, type PinInputRootEmits, type PinInputRootProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';

const props = withDefaults(defineProps<PinInputRootProps>(), {
  modelValue: () => [],
});
const emits = defineEmits<PinInputRootEmits>();

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
