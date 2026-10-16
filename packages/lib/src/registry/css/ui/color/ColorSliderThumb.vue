<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { ColorSliderThumb, type ColorSliderThumbProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
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
    class="sigma-ui-color-slider-thumb"
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="[$attrs.class]"
  >
    <slot v-bind="slotProps" />
  </ColorSliderThumb>
</template>

<style>
.sigma-ui-color-slider-thumb {
  display: block;
  width: 1rem;
  height: 1rem;
  border: 2px solid white;
  border-radius: var(--radius-full);
  background-color: var(--background);
  box-shadow: var(--shadow-sm);
}

.sigma-ui-color-slider-thumb:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
</style>
