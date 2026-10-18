<script setup lang="ts">
import { useAttrs } from 'vue';

import { TimeRangeFieldRoot, type TimeRangeFieldRootEmits, type TimeRangeFieldRootProps, type SegmentPart, useForwardPropsEmits } from 'reka-ui';
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
    class="sigma-ui-time-range-field"
    :class="[$attrs.class]"
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
        class="sigma-ui-time-range-field__separator"
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

<style>
.sigma-ui-time-range-field {
  display: inline-flex;
  height: 2.25rem;
  align-items: center;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background-color: var(--input);
  font-size: 1rem;
  padding-inline: 0.75rem;
}

@media (width >= 48rem) {
  .sigma-ui-time-range-field {
    font-size: 0.875rem;
  }
}

.sigma-ui-time-range-field:focus-within {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}

.sigma-ui-time-range-field[data-invalid],
.sigma-ui-time-range-field[aria-invalid="true"] {
  border-color: var(--destructive);
}

.sigma-ui-time-range-field[data-disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}

.sigma-ui-time-range-field__separator {
  color: var(--muted-foreground);
  padding-inline: 0.375rem;
}
</style>
