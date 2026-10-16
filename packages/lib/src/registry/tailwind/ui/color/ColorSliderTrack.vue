<script setup lang="ts">
import { ColorSliderTrack, type ColorSliderTrackProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<ColorSliderTrackProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <ColorSliderTrack
    data-slot="color-slider-track"
    v-bind="{ ...forwarded, ...$attrs }"
    :class="cn('relative h-3 w-full grow rounded-full', $attrs.class ?? '')"
  >
    <slot />
  </ColorSliderTrack>
</template>
