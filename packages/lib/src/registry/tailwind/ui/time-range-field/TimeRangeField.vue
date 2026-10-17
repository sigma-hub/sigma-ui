<script setup lang="ts">
import { useAttrs } from 'vue';

import { TimeRangeFieldRoot, type TimeRangeFieldRootEmits, type TimeRangeFieldRootProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<TimeRangeFieldRootProps>();
const emits = defineEmits<TimeRangeFieldRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);

defineSlots<{
  /**
   * Start and end segments. Render each segment value inside an input.
   */
  default?: (props: {
    modelValue: { start?: unknown; end?: unknown } | undefined;
    segments: {
      start: { part: string; value: string }[];
      end: { part: string; value: string }[];
    };
    isInvalid: boolean;
  }) => unknown;
}>();
</script>

<template>
  <TimeRangeFieldRoot
    v-slot="slotProps"
    data-slot="time-range-field"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn('inline-flex h-9 items-center gap-1 rounded-md border border-input bg-transparent px-3 text-sm', $attrs.class ?? '')"
  >
    <slot v-bind="slotProps" />
  </TimeRangeFieldRoot>
</template>
