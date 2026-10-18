<script setup lang="ts">
import { useAttrs } from 'vue';

import type { ComboboxEmptyProps } from 'reka-ui';
import { ComboboxEmpty } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ComboboxEmptyProps>();
</script>

<template>
  <ComboboxEmpty
    data-slot="command-empty"
    v-bind="{ ...props, ...delegatedAttrs() }"
    :class="cn('py-6 text-center text-sm', $attrs.class ?? '')"
  >
    <slot />
  </ComboboxEmpty>
</template>
