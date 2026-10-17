<script setup lang="ts">
import { useAttrs } from 'vue';

import { ColorSliderRoot, type ColorSliderRootEmits, type ColorSliderRootProps, useForwardPropsEmits } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ColorSliderRootProps>();
const emits = defineEmits<ColorSliderRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ColorSliderRoot
    data-slot="color-slider"
    class="sigma-ui-color-slider"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  >
    <slot />
  </ColorSliderRoot>
</template>

<style>
.sigma-ui-color-slider {
  position: relative;
  display: flex;
  width: 100%;
  align-items: center;
  touch-action: none;
  user-select: none;
}
</style>
