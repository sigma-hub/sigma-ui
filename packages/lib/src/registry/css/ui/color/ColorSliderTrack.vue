<script setup lang="ts">
import { useAttrs } from 'vue';

import { ColorSliderTrack, type ColorSliderTrackProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ColorSliderTrackProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <ColorSliderTrack
    data-slot="color-slider-track"
    class="sigma-ui-color-slider-track"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  >
    <slot />
  </ColorSliderTrack>
</template>

<style>
.sigma-ui-color-slider-track {
  position: relative;
  width: 100%;
  height: 0.75rem;
  flex-grow: 1;
  border-radius: var(--radius-full);
}
</style>
