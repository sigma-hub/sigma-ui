<script setup lang="ts">
import { PinInputInput, type PinInputInputProps, useForwardProps } from 'reka-ui';

const props = defineProps<PinInputInputProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <PinInputInput
    v-bind="forwardedProps"
    class="sigma-ui-pin-input-input"
  />
</template>

<style>
.sigma-ui-pin-input-input {
  position: relative;
  display: flex;
  height: 2.5rem;
  width: 2.5rem;
  align-items: center;
  justify-content: center;
  border: 1px solid hsl(var(--input));
  border-left: none;
  font-size: 0.875rem;
  text-align: center;
  transition: all 150ms;
}

.sigma-ui-pin-input-input:first-child {
  border-left: 1px solid hsl(var(--input));
  border-top-left-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
}

.sigma-ui-pin-input-input:last-child {
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}

.sigma-ui-pin-input-input:focus {
  outline: none;
  position: relative;
  z-index: 10;
  box-shadow: 0 0 0 2px hsl(var(--ring));
}
</style>
