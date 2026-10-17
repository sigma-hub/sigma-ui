<script setup lang="ts">
import { useAttrs } from 'vue';

import { ColorSliderTrack, type ColorSliderTrackProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

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
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn('relative h-3 w-full grow rounded-full', $attrs.class ?? '')"
  >
    <slot />
  </ColorSliderTrack>
</template>
