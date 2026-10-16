<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { AutocompleteAnchor, type ComboboxAnchorProps, useForwardProps } from 'reka-ui';

defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<ComboboxAnchorProps>();
const forwarded = useForwardProps(props);
</script>

<template>
  <AutocompleteAnchor
    data-slot="autocomplete-anchor"
    class="sigma-ui-autocomplete-anchor"
    v-bind="{ ...forwarded, ...delegatedAttrs }"
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
