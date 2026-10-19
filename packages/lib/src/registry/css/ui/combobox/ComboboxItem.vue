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
    data-slot="combobox-item"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="['sigma-ui-combobox-item', $attrs.class]"
  >
    <slot />
  </ComboboxItem>
</template>

<style>
@layer components {
  .sigma-ui-combobox-item {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: calc(var(--spacing) * 1.5) calc(var(--spacing) * 2);
    border-radius: 0.125rem;
    cursor: default;
    font-size: 0.875rem;
    gap: calc(var(--spacing) * 2);
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
    width: calc(var(--spacing) * 4);
    height: calc(var(--spacing) * 4);
    flex-shrink: 0;
  }
}
</style>
