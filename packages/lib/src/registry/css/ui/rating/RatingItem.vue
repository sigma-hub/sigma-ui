<script setup lang="ts">
import { RatingItem, type RatingItemProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<RatingItemProps>();
const forwarded = useForwardProps(props);

defineSlots<{
  /**
   * Indicators for this item. Receives the step values that make up the item.
   */
  default?: (props: { steps: number[] }) => unknown;
}>();
</script>

<template>
  <RatingItem
    v-slot="slotProps"
    data-slot="rating-item"
    class="sigma-ui-rating-item"
    v-bind="{ ...forwarded, ...$attrs }"
    :class="[$attrs.class]"
  >
    <slot v-bind="slotProps" />
  </RatingItem>
</template>

<style>
.sigma-ui-rating-item {
  position: relative;
  display: inline-flex;
}
</style>
