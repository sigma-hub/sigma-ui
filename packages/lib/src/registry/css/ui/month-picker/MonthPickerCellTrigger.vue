<script lang="ts" setup>
import { useAttrs } from 'vue';

import { MonthPickerCellTrigger, type MonthPickerCellTriggerProps, useForwardProps } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<MonthPickerCellTriggerProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <MonthPickerCellTrigger
    data-slot="month-picker-cell-trigger"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-month-picker-cell-trigger"
    :class="[$attrs.class]"
  >
    <slot />
  </MonthPickerCellTrigger>
</template>

<style>
.sigma-ui-month-picker-cell-trigger {
  display: inline-flex;
  min-width: 4.5rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  padding-inline: 0.5rem;
}

.sigma-ui-month-picker-cell-trigger:hover {
  background-color: var(--accent);
  color: var(--accent-foreground);
}

.sigma-ui-month-picker-cell-trigger:focus-visible {
  outline: 2px solid var(--ring);
}

.sigma-ui-month-picker-cell-trigger[data-selected] {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

.sigma-ui-month-picker-cell-trigger[data-today]:not([data-selected]) {
  background-color: var(--accent);
  color: var(--accent-foreground);
}

.sigma-ui-month-picker-cell-trigger[data-disabled] {
  opacity: 0.5;
  pointer-events: none;
}
</style>
