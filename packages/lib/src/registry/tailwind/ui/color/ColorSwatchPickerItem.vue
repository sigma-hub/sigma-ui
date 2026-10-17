<script setup lang="ts">
import { useAttrs } from 'vue';

import { ColorSwatchPickerItem, type ColorSwatchPickerItemProps, type ListboxItemEmits, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ColorSwatchPickerItemProps>();
const emits = defineEmits<ListboxItemEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ColorSwatchPickerItem
    data-slot="color-swatch-picker-item"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn('rounded-md outline-none focus-visible:outline-2 focus-visible:outline-ring data-[highlighted]:outline-2 data-[highlighted]:outline-ring', $attrs.class ?? '')"
  >
    <slot />
  </ColorSwatchPickerItem>
</template>
