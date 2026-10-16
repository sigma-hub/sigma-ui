<script setup lang="ts">
import { ColorSwatchPickerItem, type ColorSwatchPickerItemProps, type ListboxItemEmits, useForwardPropsEmits } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<ColorSwatchPickerItemProps>();
const emits = defineEmits<ListboxItemEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ColorSwatchPickerItem
    data-slot="color-swatch-picker-item"
    class="sigma-ui-color-swatch-picker-item"
    v-bind="{ ...forwarded, ...$attrs }"
    :class="[$attrs.class]"
  >
    <slot />
  </ColorSwatchPickerItem>
</template>

<style>
.sigma-ui-color-swatch-picker-item {
  border-radius: var(--radius-md);
  outline: none;
}

.sigma-ui-color-swatch-picker-item:focus-visible,
.sigma-ui-color-swatch-picker-item[data-highlighted] {
  outline: 2px solid var(--ring);
}
</style>
