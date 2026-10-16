<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { AutocompleteInput, type AutocompleteInputEmits, type AutocompleteInputProps, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<AutocompleteInputProps>();
const emits = defineEmits<AutocompleteInputEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <AutocompleteInput
    data-slot="autocomplete-input"
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="cn('flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm outline-none placeholder:text-muted-foreground focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50', $attrs.class ?? '')"
  >
    <slot />
  </AutocompleteInput>
</template>
