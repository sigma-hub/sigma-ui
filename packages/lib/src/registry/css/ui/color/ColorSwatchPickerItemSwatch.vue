<script setup lang="ts">
import { ColorSwatchPickerItemSwatch, type ColorSwatchPickerItemSwatchProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<ColorSwatchPickerItemSwatchProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <ColorSwatchPickerItemSwatch
    data-slot="color-swatch-picker-item-swatch"
    class="sigma-ui-color-swatch-picker-swatch"
    v-bind="{ ...forwarded, ...$attrs }"
    :class="[$attrs.class]"
  />
</template>

<style>
.sigma-ui-color-swatch-picker-swatch {
  display: block;
  width: 1.5rem;
  height: 1.5rem;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background-color: var(--reka-color-swatch-color);
}
</style>
