<script setup lang="ts">
import { useAttrs } from 'vue';

import { AutocompleteItem, type ComboboxItemEmits, type ComboboxItemProps, useForwardPropsEmits } from 'reka-ui';

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
  <AutocompleteItem
    data-slot="autocomplete-item"
    class="sigma-ui-autocomplete-item"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  >
    <slot />
  </AutocompleteItem>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-autocomplete-item {
    position: relative;
    display: flex;
    align-items: center;
    padding: calc(var(--spacing) * 1.5) calc(var(--spacing) * 2);
    border-radius: var(--radius-sm);
    font-size: 0.875rem;
    outline: none;
    user-select: none;
  }

  .sigma-ui-autocomplete-item[data-highlighted] {
    background-color: var(--accent);
    color: var(--accent-foreground);
  }

  .sigma-ui-autocomplete-item[data-disabled] {
    opacity: 0.5;
    pointer-events: none;
  }
}
</style>
