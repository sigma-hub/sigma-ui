<script lang="ts" setup>
import { YearPickerCellTrigger, type YearPickerCellTriggerProps, useForwardProps } from 'reka-ui';

const props = defineProps<YearPickerCellTriggerProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <YearPickerCellTrigger
    data-slot="year-picker-cell-trigger"
    class="sigma-ui-year-picker-cell-trigger"
    v-bind="forwarded"
    :class="[$attrs.class]"
  >
    <slot />
  </YearPickerCellTrigger>
</template>

<style>
.sigma-ui-year-picker-cell-trigger {
  display: inline-flex;
  min-width: 4.5rem;
  height: 2rem;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-md);
  font-size: 0.875rem;
  padding-inline: 0.5rem;
}

.sigma-ui-year-picker-cell-trigger:hover {
  background-color: var(--accent);
  color: var(--accent-foreground);
}

.sigma-ui-year-picker-cell-trigger:focus-visible {
  outline: 2px solid var(--ring);
}

.sigma-ui-year-picker-cell-trigger[data-selected] {
  background-color: var(--primary);
  color: var(--primary-foreground);
}

.sigma-ui-year-picker-cell-trigger[data-today]:not([data-selected]) {
  background-color: var(--accent);
  color: var(--accent-foreground);
}

.sigma-ui-year-picker-cell-trigger[data-disabled] {
  opacity: 0.5;
  pointer-events: none;
}
</style>
