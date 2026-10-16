<script setup lang="ts">
import { AutocompleteEmpty, type ComboboxEmptyProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<ComboboxEmptyProps>();
</script>

<template>
  <AutocompleteEmpty
    data-slot="autocomplete-empty"
    v-bind="{ ...props, ...$attrs }"
    :class="cn('py-6 text-center text-sm', $attrs.class ?? '')"
  >
    <slot />
  </AutocompleteEmpty>
</template>
