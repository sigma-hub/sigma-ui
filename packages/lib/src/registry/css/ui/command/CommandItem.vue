<script setup lang="ts">
import type { ComboboxItemEmits, ComboboxItemProps } from 'reka-ui';
import { ComboboxItem, useForwardPropsEmits } from 'reka-ui';

const props = defineProps<ComboboxItemProps>();
const emits = defineEmits<ComboboxItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ComboboxItem
    v-bind="forwarded"
    class="sigma-ui-command-item"
  >
    <slot />
  </ComboboxItem>
</template>

<style>
.sigma-ui-command-item {
  position: relative;
  display: flex;
  cursor: default;
  user-select: none;
  align-items: center;
  border-radius: var(--radius-sm);
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  outline: none;
}

.sigma-ui-command-item[data-highlighted] {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.sigma-ui-command-item[data-disabled] {
  pointer-events: none;
  opacity: 0.5;
}
</style>
