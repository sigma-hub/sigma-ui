<script setup lang="ts">
import { useAttrs } from 'vue';

import type { ComboboxRootEmits, ComboboxRootProps } from 'reka-ui';
import { ComboboxRoot, useForwardPropsEmits } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(defineProps<ComboboxRootProps>(), {
  open: true,
  modelValue: '',
});

const emits = defineEmits<ComboboxRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ComboboxRoot
    data-slot="command"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-command"
    :class="[$attrs.class]"
  >
    <slot />
  </ComboboxRoot>
</template>

<style>
.sigma-ui-command {
  display: flex;
  overflow: hidden;
  width: 100%;
  height: 100%;
  flex-direction: column;
  border-radius: var(--radius-md);
  background-color: var(--popover);
  color: var(--popover-foreground);
}
</style>
