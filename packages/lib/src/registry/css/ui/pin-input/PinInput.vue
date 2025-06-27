<script setup lang="ts">
import { PinInputRoot, type PinInputRootEmits, type PinInputRootProps, useForwardPropsEmits } from 'reka-ui';

const props = withDefaults(defineProps<PinInputRootProps>(), {
  modelValue: () => [],
});
const emits = defineEmits<PinInputRootEmits>();

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
  gap: 0.5rem;
  align-items: center;
}
</style>
