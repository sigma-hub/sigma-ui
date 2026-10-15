<script setup lang="ts">
import { AspectRatio, type AspectRatioProps } from 'reka-ui';

const props = defineProps<AspectRatioProps>();

defineSlots<{
  /**
   * Content that fills the ratio box. Receives the current ratio as a percentage.
   */
  default?: (props: { aspect: number }) => unknown;
}>();
</script>

<template>
  <AspectRatio
    v-slot="slotProps"
    data-slot="aspect-ratio"
    v-bind="props"
  >
    <slot v-bind="slotProps" />
  </AspectRatio>
</template>
