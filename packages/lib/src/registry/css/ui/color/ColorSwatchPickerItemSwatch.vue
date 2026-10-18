<script setup lang="ts">
import { useAttrs } from 'vue';

import { ColorSwatchPickerItemSwatch, type ColorSwatchPickerItemSwatchProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ColorSwatchPickerItemSwatchProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <ColorSwatchPickerItemSwatch
    data-slot="color-swatch-picker-item-swatch"
    class="sigma-ui-color-swatch-picker-swatch"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  />
</template>

<style>
.sigma-ui-color-swatch-picker-swatch {
  display: block;
  width: calc(var(--spacing) * 6);
  height: calc(var(--spacing) * 6);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background-color: var(--reka-color-swatch-color);
}
</style>
