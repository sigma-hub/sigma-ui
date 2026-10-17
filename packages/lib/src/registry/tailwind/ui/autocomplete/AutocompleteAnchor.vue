<script setup lang="ts">
import { useAttrs } from 'vue';

import { AutocompleteAnchor, type ComboboxAnchorProps, useForwardProps } from 'reka-ui';
import { cn } from '@ui/utils';

defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ComboboxAnchorProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <AutocompleteAnchor
    data-slot="autocomplete-anchor"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="cn('w-64', $attrs.class ?? '')"
  >
    <slot />
  </AutocompleteAnchor>
</template>
