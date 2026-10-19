<script setup lang="ts">
import { useAttrs } from 'vue';

import { AutocompleteEmpty, type ComboboxEmptyProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ComboboxEmptyProps>();
</script>

<template>
  <AutocompleteEmpty
    data-slot="autocomplete-empty"
    class="sigma-ui-autocomplete-empty"
    v-bind="{ ...props, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  >
    <slot />
  </AutocompleteEmpty>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-autocomplete-empty {
    font-size: 0.875rem;
    padding-block: calc(var(--spacing) * 6);
    text-align: center;
  }
}
</style>
