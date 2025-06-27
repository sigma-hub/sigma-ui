<script setup lang="ts">
import type { ComboboxItemEmits, ComboboxItemProps } from 'reka-ui';
import { ComboboxItem, useForwardPropsEmits } from 'reka-ui';

const props = defineProps<ComboboxItemProps>();
const emits = defineEmits<ComboboxItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ComboboxItem
    v-bind="{ ...forwarded, ...$attrs }"
    :class="['sigma-ui-combobox-item', $attrs.class]"
  >
    <slot />
  </ComboboxItem>
</template>

<style>
.sigma-ui-combobox-item {
  position: relative;
  display: flex;
  cursor: default;
  gap: 0.5rem;
  user-select: none;
  justify-content: space-between;
  align-items: center;
  border-radius: 0.125rem;
  padding: 0.375rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  outline: none;
}

.sigma-ui-combobox-item[data-highlighted] {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.sigma-ui-combobox-item[data-disabled] {
  pointer-events: none;
  opacity: 0.5;
}

.sigma-ui-combobox-item svg {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}
</style>
