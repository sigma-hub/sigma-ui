<script setup lang="ts">
import { AutocompleteAnchor, type ComboboxAnchorProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<ComboboxAnchorProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <AutocompleteAnchor
    data-slot="autocomplete-anchor"
    v-bind="{ ...forwarded, ...$attrs }"
    :class="cn('w-64', $attrs.class ?? '')"
  >
    <slot />
  </AutocompleteAnchor>
</template>
