<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { RadioGroupRoot, type RadioGroupRootEmits, type RadioGroupRootProps, useForwardPropsEmits } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<RadioGroupRootProps>();
const emits = defineEmits<RadioGroupRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <RadioGroupRoot
    class="sigma-ui-radio-group"
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    data-slot="radio-group"
    :class="[$attrs.class]"
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
