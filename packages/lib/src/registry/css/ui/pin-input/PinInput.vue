<script setup lang="ts" generic="Type extends 'text' | 'number' = 'text'">
import { PinInputRoot, type PinInputRootEmits, type PinInputRootProps, useForwardPropsEmits } from 'reka-ui';

const props = withDefaults(defineProps<PinInputRootProps<Type>>(), {
  modelValue: () => [],
});
const emits = defineEmits<PinInputRootEmits<Type>>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <PinInputRoot
    v-bind="forwarded"
    class="sigma-ui-pin-input"
  >
    <slot />
  </PinInputRoot>
</template>

<style>
.sigma-ui-pin-input {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
