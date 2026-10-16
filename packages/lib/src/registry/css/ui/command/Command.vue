<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ComboboxRootEmits, ComboboxRootProps } from 'reka-ui';
import { ComboboxRoot, useForwardPropsEmits } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = withDefaults(defineProps<ComboboxRootProps>(), {
  open: true,
  modelValue: '',
});

const emits = defineEmits<ComboboxRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ComboboxRoot
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    class="sigma-ui-command"
    data-slot="command"
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
