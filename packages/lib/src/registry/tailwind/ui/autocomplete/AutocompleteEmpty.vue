<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { AutocompleteEmpty, type ComboboxEmptyProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<ComboboxEmptyProps>();
</script>

<template>
  <AutocompleteEmpty
    data-slot="autocomplete-empty"
    v-bind="{ ...props, ...delegatedAttrs }"
    :class="cn('py-6 text-center text-sm', $attrs.class ?? '')"
  >
    <slot />
  </AutocompleteEmpty>
</template>
