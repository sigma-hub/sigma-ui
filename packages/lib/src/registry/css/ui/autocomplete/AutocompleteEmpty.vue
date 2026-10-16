<script setup lang="ts">
import { AutocompleteEmpty, type ComboboxEmptyProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<ComboboxEmptyProps>();
</script>

<template>
  <AutocompleteEmpty
    data-slot="autocomplete-empty"
    class="sigma-ui-autocomplete-empty"
    v-bind="{ ...props, ...$attrs }"
    :class="[$attrs.class]"
  >
    <slot />
  </AutocompleteEmpty>
</template>

<style>
.sigma-ui-autocomplete-empty {
  font-size: 0.875rem;
  padding-block: 1.5rem;
  text-align: center;
}
</style>
