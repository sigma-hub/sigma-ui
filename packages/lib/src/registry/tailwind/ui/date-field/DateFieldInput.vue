<script setup lang="ts">
import { useAttrs } from 'vue';

import { DateFieldInput, type DateFieldInputProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<DateFieldInputProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <DateFieldInput
    data-slot="date-field-input"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :data-part="props.part"
    :class="cn('rounded-sm px-0.5 tabular-nums outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:cursor-not-allowed data-[part=literal]:px-0', $attrs.class ?? '')"
  >
    <slot />
  </DateFieldInput>
</template>
