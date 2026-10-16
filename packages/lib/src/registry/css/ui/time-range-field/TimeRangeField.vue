<script setup lang="ts">
import { TimeRangeFieldRoot, type TimeRangeFieldRootEmits, type TimeRangeFieldRootProps, useForwardPropsEmits } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<TimeRangeFieldRootProps>();
const emits = defineEmits<TimeRangeFieldRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <TimeRangeFieldRoot
    data-slot="time-range-field"
    class="sigma-ui-time-range-field"
    v-bind="{ ...forwarded, ...$attrs }"
    :class="[$attrs.class]"
  >
    <slot />
  </TimeRangeFieldRoot>
</template>

<style>
.sigma-ui-time-range-field {
  display: inline-flex;
  height: 2.25rem;
  align-items: center;
  border: 1px solid var(--input);
  border-radius: var(--radius-md);
  background-color: transparent;
  font-size: 0.875rem;
  gap: 0.25rem;
  padding-inline: 0.75rem;
}
</style>
