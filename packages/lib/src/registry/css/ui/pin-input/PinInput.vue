<script setup lang="ts" generic="Type extends 'text' | 'number' = 'text'">
import { useAttrs } from 'vue';

import { PinInputRoot, type PinInputRootEmits, type PinInputRootProps, useForwardPropsEmits } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(defineProps<PinInputRootProps<Type>>(), {
  modelValue: () => [],
});
const emits = defineEmits<PinInputRootEmits<Type>>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <PinInputRoot
    data-slot="pin-input"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-pin-input"
    :class="[$attrs.class]"
  >
    <slot />
  </PinInputRoot>
</template>

<style>
@layer components {
  .sigma-ui-pin-input {
    display: flex;
    align-items: center;
    gap: calc(var(--spacing) * 2);
  }
}
</style>
