<script setup lang="ts">
import { ColorSwatch, type ColorSwatchProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

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
    v-bind="{ ...forwarded, ...$attrs }"
    :class="cn('size-9 rounded-md border border-border bg-(--reka-color-swatch-color) bg-[image:linear-gradient(var(--reka-color-swatch-color),var(--reka-color-swatch-color)),repeating-conic-gradient(var(--muted)_0%_25%,var(--background)_0%_50%)] bg-[size:auto,0.5rem_0.5rem]', $attrs.class ?? '')"
  >
    <slot v-bind="slotProps" />
  </ColorSwatch>
</template>
