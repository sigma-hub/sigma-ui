<script setup lang="ts">
import { ColorSliderThumb, type ColorSliderThumbProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<ColorSliderThumbProps>();
const forwarded = useForwardProps(props);

defineSlots<{
  /**
   * Thumb content. Receives the channel name and its current value.
   */
  default?: (props: { channelName: string; channelValue: number }) => unknown;
}>();
</script>

<template>
  <ColorSliderThumb
    v-slot="slotProps"
    data-slot="color-slider-thumb"
    v-bind="{ ...forwarded, ...$attrs }"
    :class="cn('block size-4 rounded-full border-2 border-white bg-background shadow-sm focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2', $attrs.class ?? '')"
  >
    <slot v-bind="slotProps" />
  </ColorSliderThumb>
</template>
