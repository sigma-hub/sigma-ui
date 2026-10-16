<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ComboboxItemEmits, ComboboxItemProps } from 'reka-ui';
import { ComboboxItem, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<ComboboxItemProps>();
const emits = defineEmits<ComboboxItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ComboboxItem
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="cn('relative flex cursor-default gap-2 select-none justify-between items-center rounded-sm px-2 py-1.5 text-sm outline-none data-[highlighted]:bg-secondary data-[highlighted]:text-secondary-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0', $attrs.class ?? '')"
    data-slot="combobox-item"
  >
    <slot />
  </ComboboxItem>
</template>
