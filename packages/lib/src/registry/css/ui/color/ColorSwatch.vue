<script setup lang="ts">
import { useAttrs } from 'vue';

import { ColorSwatch, type ColorSwatchProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ColorSwatchProps>();
const forwarded = useForwardProps(props);

defineSlots<{
  /**
   * Replaces the painted swatch. Receives the hex color and its alpha.
   */
  default?: (props: { color: string; alpha: number }) => unknown;
}>();
</script>

<template>
  <ColorSwatch
    v-slot="slotProps"
    data-slot="color-swatch"
    class="sigma-ui-color-swatch"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  >
    <slot v-bind="slotProps" />
  </ColorSwatch>
</template>

<style>
.sigma-ui-color-swatch {
  width: calc(var(--spacing) * 9);
  height: calc(var(--spacing) * 9);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background-color: var(--reka-color-swatch-color);
  background-image:
    linear-gradient(var(--reka-color-swatch-color), var(--reka-color-swatch-color)),
    repeating-conic-gradient(var(--muted) 0% 25%, var(--background) 0% 50%);
  background-size: auto, 0.5rem 0.5rem;
}
</style>
