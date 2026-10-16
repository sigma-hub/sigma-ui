<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ComboboxItemEmits, ComboboxItemProps } from 'reka-ui';
import { ComboboxItem, useForwardPropsEmits } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<ComboboxItemProps>();
const emits = defineEmits<ComboboxItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ComboboxItem
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="['sigma-ui-combobox-item', $attrs.class]"
    data-slot="combobox-item"
  >
    <slot />
  </ComboboxItem>
</template>

<style>
.sigma-ui-combobox-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.375rem 0.5rem;
  border-radius: 0.125rem;
  cursor: default;
  font-size: 0.875rem;
  gap: 0.5rem;
  line-height: 1.25rem;
  outline: none;
  user-select: none;
}

.sigma-ui-combobox-item[data-highlighted] {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.sigma-ui-combobox-item[data-disabled] {
  opacity: 0.5;
  pointer-events: none;
}

.sigma-ui-combobox-item svg {
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
}
</style>
