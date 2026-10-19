<script setup lang="ts">
import { useAttrs } from 'vue';

import type { ComboboxItemEmits, ComboboxItemProps } from 'reka-ui';
import { ComboboxItem, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ComboboxItemProps>();
const emits = defineEmits<ComboboxItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ComboboxItem
    data-slot="command-item"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn('relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-hidden data-[highlighted]:bg-secondary data-[highlighted]:text-secondary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50', $attrs.class ?? '')"
  >
    <slot />
  </ComboboxItem>
</template>
