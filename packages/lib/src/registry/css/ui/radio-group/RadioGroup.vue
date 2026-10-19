<script setup lang="ts">
import { useAttrs } from 'vue';

import { RadioGroupRoot, type RadioGroupRootEmits, type RadioGroupRootProps, useForwardPropsEmits } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<RadioGroupRootProps>();
const emits = defineEmits<RadioGroupRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <RadioGroupRoot
    class="sigma-ui-radio-group"
    data-slot="radio-group"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  >
    <slot />
  </RadioGroupRoot>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-radio-group {
    display: grid;
    gap: calc(var(--spacing) * 2);
  }
}
</style>
