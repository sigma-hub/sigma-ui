<script setup lang="ts">
import { useAttrs } from 'vue';

import { TimeRangeFieldRoot, type TimeRangeFieldRootEmits, type TimeRangeFieldRootProps, type SegmentPart, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';
import { TimeRangeFieldInput } from '.';

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
   * The start and end segments. Each one renders in a `TimeRangeFieldInput`, with a dash between the two times, unless you pass your own content.
   */
  default?: (props: {
    modelValue: TimeRangeFieldRootProps['modelValue'];
    segments: {
      start: { part: SegmentPart; value: string }[];
      end: { part: SegmentPart; value: string }[];
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
    :class="cn('inline-flex h-9 items-center rounded-md border border-border bg-input px-3 text-base focus-within:outline-2 focus-within:outline-ring focus-within:outline-offset-2 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[invalid]:border-destructive aria-invalid:border-destructive md:text-sm', $attrs.class ?? '')"
  >
    <slot v-bind="slotProps">
      <TimeRangeFieldInput
        v-for="(item, index) in slotProps.segments.start"
        :key="`start-${item.part}-${index}`"
        :part="item.part"
        type="start"
      >
        {{ item.value }}
      </TimeRangeFieldInput>
      <span
        data-slot="time-range-field-separator"
        aria-hidden="true"
        class="px-1.5 text-muted-foreground"
      >–</span>
      <TimeRangeFieldInput
        v-for="(item, index) in slotProps.segments.end"
        :key="`end-${item.part}-${index}`"
        :part="item.part"
        type="end"
      >
        {{ item.value }}
      </TimeRangeFieldInput>
    </slot>
  </TimeRangeFieldRoot>
</template>
