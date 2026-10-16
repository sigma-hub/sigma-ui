<script setup lang="ts">
import { RatingItem, type RatingItemProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

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
    v-bind="{ ...forwarded, ...$attrs }"
    :class="cn('relative inline-flex', $attrs.class ?? '')"
  >
    <slot v-bind="slotProps" />
  </RatingItem>
</template>
