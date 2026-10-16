<script setup lang="ts">
import { ColorSwatchPickerRoot, type ColorSwatchPickerRootEmits, type ColorSwatchPickerRootProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<ColorSwatchPickerRootProps>();
const emits = defineEmits<ColorSwatchPickerRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ColorSwatchPickerRoot
    data-slot="color-swatch-picker"
    v-bind="{ ...forwarded, ...$attrs }"
    :class="cn('flex flex-wrap gap-2', $attrs.class ?? '')"
  >
    <slot />
  </ColorSwatchPickerRoot>
</template>
