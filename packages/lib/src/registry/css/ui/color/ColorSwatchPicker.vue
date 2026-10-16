<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { ColorSwatchPickerRoot, type ColorSwatchPickerRootEmits, type ColorSwatchPickerRootProps, useForwardPropsEmits } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<ColorSwatchPickerRootProps>();
const emits = defineEmits<ColorSwatchPickerRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ColorSwatchPickerRoot
    data-slot="color-swatch-picker"
    class="sigma-ui-color-swatch-picker"
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="[$attrs.class]"
  >
    <slot />
  </ColorSwatchPickerRoot>
</template>

<style>
.sigma-ui-color-swatch-picker {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
</style>
