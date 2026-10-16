<script setup lang="ts">
import { AutocompleteRoot, type AutocompleteRootEmits, type AutocompleteRootProps, useForwardPropsEmits } from 'reka-ui';

const props = defineProps<AutocompleteRootProps>();
const emits = defineEmits<AutocompleteRootEmits>();
const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <AutocompleteRoot
    data-slot="autocomplete"
    v-bind="forwarded"
  >
    <slot />
  </AutocompleteRoot>
</template>
