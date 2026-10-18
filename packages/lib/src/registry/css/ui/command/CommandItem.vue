<script setup lang="ts">
import { useAttrs } from 'vue';

import type { ComboboxItemEmits, ComboboxItemProps } from 'reka-ui';
import { ComboboxItem, useForwardPropsEmits } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ComboboxItemProps>();
const emits = defineEmits<ComboboxItemEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ComboboxItem
    data-slot="command-item"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    class="sigma-ui-command-item"
    :class="[$attrs.class]"
  >
    <slot />
  </ComboboxItem>
</template>

<style>
.sigma-ui-command-item {
  position: relative;
  display: flex;
  align-items: center;
  padding: calc(var(--spacing) * 1.5) calc(var(--spacing) * 2);
  border-radius: var(--radius-sm);
  cursor: default;
  font-size: 0.875rem;
  line-height: 1.25rem;
  outline: none;
  user-select: none;
}

.sigma-ui-command-item[data-highlighted] {
  background-color: var(--secondary);
  color: var(--secondary-foreground);
}

.sigma-ui-command-item[data-disabled] {
  opacity: 0.5;
  pointer-events: none;
}
</style>
