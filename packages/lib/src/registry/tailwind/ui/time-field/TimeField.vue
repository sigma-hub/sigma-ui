<script setup lang="ts">
import { useAttrs } from 'vue';

import { TimeFieldRoot, type TimeFieldRootEmits, type TimeFieldRootProps, type SegmentPart, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';
import { TimeFieldInput } from '.';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<TimeFieldRootProps>();
const emits = defineEmits<TimeFieldRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);

defineSlots<{
  /**
   * The time segments. Each one renders in a `TimeFieldInput` unless you pass your own content.
   */
  default?: (props: {
    modelValue: TimeFieldRootProps['modelValue'];
    segments: { part: SegmentPart; value: string }[];
    isInvalid: boolean;
  }) => unknown;
}>();
</script>

<template>
  <TimeFieldRoot
    v-slot="slotProps"
    data-slot="time-field"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn('inline-flex h-9 items-center rounded-md border border-border bg-input px-3 text-base focus-within:outline-2 focus-within:outline-ring focus-within:outline-offset-2 data-[disabled]:cursor-not-allowed data-[disabled]:opacity-50 data-[invalid]:border-destructive aria-invalid:border-destructive md:text-sm', $attrs.class ?? '')"
  >
    <slot v-bind="slotProps">
      <TimeFieldInput
        v-for="(item, index) in slotProps.segments"
        :key="`${item.part}-${index}`"
        :part="item.part"
      >
        {{ item.value }}
      </TimeFieldInput>
    </slot>
  </TimeFieldRoot>
</template>
