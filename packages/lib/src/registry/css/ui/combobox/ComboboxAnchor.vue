<script setup lang="ts">
import { useAttrs } from 'vue';

import type { ComboboxAnchorProps } from 'reka-ui';
import { ComboboxAnchor, useForwardProps } from 'reka-ui';
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
  <ComboboxAnchor
    data-slot="combobox-anchor"
    v-bind="{ ...forwarded, ...delegatedAttrs() }"
    :class="['sigma-ui-combobox-anchor', $attrs.class]"
  >
    <slot />
  </ComboboxAnchor>
</template>

<style>
@layer components {
  .sigma-ui-combobox-anchor {
    width: 200px;
  }
}
</style>
