<script setup lang="ts">
import { Primitive, type PrimitiveProps, useForwardProps } from 'reka-ui';

const props = defineProps<PrimitiveProps>();
const forwardedProps = useForwardProps(props);
</script>

<template>
  <Primitive
    v-bind="forwardedProps"
    class="sigma-ui-pin-input-group"
  >
    <slot />
  </Primitive>
</template>

<style>
.sigma-ui-pin-input-group {
  display: flex;
  align-items: center;
}
</style>
