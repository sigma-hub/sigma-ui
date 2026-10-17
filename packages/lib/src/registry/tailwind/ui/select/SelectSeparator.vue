<script setup lang="ts">
import { useAttrs } from 'vue';

import { SelectSeparator, type SelectSeparatorProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<SelectSeparatorProps>();
</script>

<template>
  <SelectSeparator
    v-bind="{ ...props, ...delegatedAttrs() }"
    data-slot="select-separator"
    :class="cn('-mx-1 my-1 h-px bg-border pointer-events-none', $attrs.class ?? '')"
  />
</template>
