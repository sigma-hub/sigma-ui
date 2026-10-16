<script setup lang="ts">
import { TimeRangeFieldRoot, type TimeRangeFieldRootEmits, type TimeRangeFieldRootProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';

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
    v-bind="{ ...forwarded, ...$attrs }"
    :class="cn('inline-flex h-9 items-center gap-1 rounded-md border border-input bg-transparent px-3 text-sm', $attrs.class ?? '')"
  >
    <slot />
  </TimeRangeFieldRoot>
</template>
