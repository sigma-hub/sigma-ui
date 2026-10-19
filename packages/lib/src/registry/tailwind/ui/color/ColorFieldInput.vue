<script setup lang="ts">
import { useAttrs } from 'vue';

import { ColorFieldInput, type ColorFieldInputProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ColorFieldInputProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <ColorFieldInput
    data-slot="color-field-input"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn('flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base outline-none focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 md:text-sm', $attrs.class ?? '')"
  />
</template>
