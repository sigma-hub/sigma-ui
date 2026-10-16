<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { RatingRoot, type RatingRootEmits, type RatingRootProps, useForwardPropsEmits } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

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
    class="sigma-ui-rating"
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="[$attrs.class]"
  >
    <slot v-bind="slotProps" />
  </RatingRoot>
</template>

<style>
.sigma-ui-rating {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
}
</style>
