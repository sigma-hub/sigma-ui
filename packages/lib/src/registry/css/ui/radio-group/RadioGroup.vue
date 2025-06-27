<script setup lang="ts">
import { RadioGroupRoot, type RadioGroupRootEmits, type RadioGroupRootProps, useForwardPropsEmits } from 'reka-ui';

const props = defineProps<RadioGroupRootProps>();
const emits = defineEmits<RadioGroupRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <RadioGroupRoot
    class="sigma-ui-radio-group"
    v-bind="forwarded"
  >
    <slot />
  </RadioGroupRoot>
</template>

<style>
.sigma-ui-radio-group {
  display: grid;
  gap: 0.5rem;
}
</style>
