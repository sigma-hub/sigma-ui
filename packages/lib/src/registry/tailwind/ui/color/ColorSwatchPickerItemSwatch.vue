<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { ColorSwatchPickerItemSwatch, type ColorSwatchPickerItemSwatchProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<ColorSwatchPickerItemSwatchProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <ColorSwatchPickerItemSwatch
    data-slot="color-swatch-picker-item-swatch"
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="cn('block size-6 rounded-md border border-border bg-(--reka-color-swatch-color)', $attrs.class ?? '')"
  />
</template>
