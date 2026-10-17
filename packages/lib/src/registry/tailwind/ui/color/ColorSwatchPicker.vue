<script setup lang="ts">
import { useAttrs } from 'vue';

import { ColorSwatchPickerRoot, type ColorSwatchPickerRootEmits, type ColorSwatchPickerRootProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ColorSwatchPickerRootProps>();
const emits = defineEmits<ColorSwatchPickerRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ColorSwatchPickerRoot
    data-slot="color-swatch-picker"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn('flex flex-wrap gap-2', $attrs.class ?? '')"
  >
    <slot />
  </ColorSwatchPickerRoot>
</template>
