<script setup lang="ts">
import { useAttrs } from 'vue';

import { AutocompleteAnchor, type ComboboxAnchorProps, useForwardProps } from 'reka-ui';

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
    class="sigma-ui-autocomplete-anchor"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="[$attrs.class]"
  >
    <slot />
  </AutocompleteAnchor>
</template>

<style>
@layer base, components;

@layer components {
  .sigma-ui-autocomplete-anchor {
    width: calc(var(--spacing) * 64);
  }
}
</style>
