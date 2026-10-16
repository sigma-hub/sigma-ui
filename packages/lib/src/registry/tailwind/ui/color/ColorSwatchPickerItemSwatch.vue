<script setup lang="ts">
import { ColorSwatchPickerItemSwatch, type ColorSwatchPickerItemSwatchProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<ColorSwatchPickerItemSwatchProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <ColorSwatchPickerItemSwatch
    data-slot="color-swatch-picker-item-swatch"
    v-bind="{ ...forwarded, ...$attrs }"
    :class="cn('block size-6 rounded-md border border-border bg-(--reka-color-swatch-color)', $attrs.class ?? '')"
  />
</template>
