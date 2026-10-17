<script setup lang="ts">
import { useAttrs } from 'vue';

import { RatingRoot, type RatingRootEmits, type RatingRootProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<RatingRootProps>();
const emits = defineEmits<RatingRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);

defineSlots<{
  /**
   * Rating items. Receives the current value and the item indexes.
   */
  default?: (props: { modelValue: number | undefined; items: number[] }) => unknown;
}>();
</script>

<template>
  <RatingRoot
    v-slot="slotProps"
    data-slot="rating"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn('inline-flex items-center gap-1', $attrs.class ?? '')"
  >
    <slot v-bind="slotProps" />
  </RatingRoot>
</template>
