<script setup lang="ts">
import { useAttrs } from 'vue';

import { TimeFieldRoot, type TimeFieldRootEmits, type TimeFieldRootProps, type SegmentPart, useForwardPropsEmits } from 'reka-ui';
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
    class="sigma-ui-time-field"
    :class="[$attrs.class]"
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

<style>
@layer components {
  .sigma-ui-time-field {
    display: inline-flex;
    height: calc(var(--spacing) * 9);
    align-items: center;
    border: 1px solid var(--border);
    border-radius: var(--radius-md);
    background-color: var(--input);
    font-size: 1rem;
    padding-inline: calc(var(--spacing) * 3);
  }

  @media (width >= 48rem) {
    .sigma-ui-time-field {
      font-size: 0.875rem;
    }
  }

  .sigma-ui-time-field:focus-within {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
  }

  .sigma-ui-time-field[data-invalid],
  .sigma-ui-time-field[aria-invalid="true"] {
    border-color: var(--destructive);
  }

  .sigma-ui-time-field[data-disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>
