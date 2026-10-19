<script setup lang="ts">
import { useAttrs } from 'vue';

import { DateFieldRoot, type DateFieldRootEmits, type DateFieldRootProps, type SegmentPart, useForwardPropsEmits } from 'reka-ui';
import { DateFieldInput } from '.';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<DateFieldRootProps>();
const emits = defineEmits<DateFieldRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);

defineSlots<{
  /**
   * The date segments. Each one renders in a `DateFieldInput` unless you pass your own content.
   */
  default?: (props: {
    modelValue: DateFieldRootProps['modelValue'];
    segments: { part: SegmentPart; value: string }[];
    isInvalid: boolean;
  }) => unknown;
}>();
</script>

<template>
  <DateFieldRoot
    v-slot="slotProps"
    data-slot="date-field"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-date-field"
    :class="[$attrs.class]"
  >
    <slot v-bind="slotProps">
      <DateFieldInput
        v-for="(item, index) in slotProps.segments"
        :key="`${item.part}-${index}`"
        :part="item.part"
      >
        {{ item.value }}
      </DateFieldInput>
    </slot>
  </DateFieldRoot>
</template>

<style>
@layer components {
  .sigma-ui-date-field {
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
    .sigma-ui-date-field {
      font-size: 0.875rem;
    }
  }

  .sigma-ui-date-field:focus-within {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
  }

  .sigma-ui-date-field[data-invalid],
  .sigma-ui-date-field[aria-invalid="true"] {
    border-color: var(--destructive);
  }

  .sigma-ui-date-field[data-disabled] {
    cursor: not-allowed;
    opacity: 0.5;
  }
}
</style>
