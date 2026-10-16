<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { ColorSliderTrack, type ColorSliderTrackProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<ColorSliderTrackProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <ColorSliderTrack
    data-slot="color-slider-track"
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="cn('relative h-3 w-full grow rounded-full', $attrs.class ?? '')"
  >
    <slot />
  </ColorSliderTrack>
</template>
