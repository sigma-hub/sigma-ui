<script setup lang="ts">
import type { ComboboxAnchorProps } from 'reka-ui';
import { ComboboxAnchor, useForwardProps } from 'reka-ui';

const props = defineProps<ComboboxAnchorProps>();

const forwarded = useForwardProps(props);
</script>

<template>
  <ComboboxAnchor
    v-bind="{ ...forwarded, ...$attrs }"
    :class="['sigma-ui-combobox-anchor', $attrs.class]"
  >
    <slot />
  </ComboboxAnchor>
</template>

<style>
.sigma-ui-combobox-anchor {
  width: 200px;
}
</style>
