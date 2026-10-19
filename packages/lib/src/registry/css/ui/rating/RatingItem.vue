<script setup lang="ts">
import { useAttrs } from 'vue';

import { RatingItem, type RatingItemProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

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
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  >
    <slot v-bind="slotProps" />
  </RatingItem>
</template>

<style>
@layer components {
  .sigma-ui-rating-item {
    position: relative;
    display: inline-flex;
  }
}
</style>
