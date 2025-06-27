<script setup lang="ts">
import type { ComboboxRootEmits, ComboboxRootProps } from 'reka-ui';
import { ComboboxRoot, useForwardPropsEmits } from 'reka-ui';

const props = withDefaults(defineProps<ComboboxRootProps>(), {
  open: true,
  modelValue: '',
});

const emits = defineEmits<ComboboxRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ComboboxRoot
    v-bind="forwarded"
    class="sigma-ui-command"
  >
    <slot />
  </ComboboxRoot>
</template>

<style>
.sigma-ui-command {
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  overflow: hidden;
  border-radius: var(--radius-md);
  background-color: hsl(var(--popover));
  color: hsl(var(--popover-foreground));
}
</style>
