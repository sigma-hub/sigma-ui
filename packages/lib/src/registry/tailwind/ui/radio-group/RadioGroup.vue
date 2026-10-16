<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { RadioGroupRoot, type RadioGroupRootEmits, type RadioGroupRootProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';
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
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="cn('grid gap-2', $attrs.class ?? '')"
    data-slot="radio-group"
  >
    <slot />
  </RadioGroupRoot>
</template>
