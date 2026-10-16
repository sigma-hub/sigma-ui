<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ComboboxAnchorProps } from 'reka-ui';
import { ComboboxAnchor, useForwardProps } from 'reka-ui';
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
  <ComboboxAnchor
    v-bind="{ ...forwarded, ...delegatedAttrs }"
    :class="['sigma-ui-combobox-anchor', $attrs.class]"
    data-slot="combobox-anchor"
  >
    <slot />
  </ComboboxAnchor>
</template>

<style>
.sigma-ui-combobox-anchor {
  width: 200px;
}
</style>
