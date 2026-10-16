<script setup lang="ts">
import { AutocompleteAnchor, type AutocompleteAnchorProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const props = defineProps<AutocompleteAnchorProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <AutocompleteAnchor
    data-slot="autocomplete-anchor"
    class="sigma-ui-autocomplete-anchor"
    v-bind="{ ...forwarded, ...$attrs }"
    :class="[$attrs.class]"
  >
    <slot />
  </AutocompleteAnchor>
</template>

<style>
.sigma-ui-autocomplete-anchor {
  width: 16rem;
}
</style>
