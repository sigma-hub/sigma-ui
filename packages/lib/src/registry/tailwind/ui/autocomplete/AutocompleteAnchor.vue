<script setup lang="ts">
import { AutocompleteAnchor, type AutocompleteAnchorProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<AutocompleteAnchorProps>();
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
