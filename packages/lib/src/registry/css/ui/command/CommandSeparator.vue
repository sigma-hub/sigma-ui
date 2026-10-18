<script setup lang="ts">
import { useAttrs } from 'vue';

import type { ComboboxSeparatorProps } from 'reka-ui';
import { ComboboxSeparator } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ComboboxSeparatorProps>();
</script>

<template>
  <ComboboxSeparator
    data-slot="command-separator"
    v-bind="{ ...props, ...delegatedAttrs() }"
    class="sigma-ui-command-separator"
    :class="[$attrs.class]"
  >
    <slot />
  </ComboboxSeparator>
</template>

<style>
.sigma-ui-command-separator {
  height: 1px;
  margin-right: -0.25rem;
  margin-left: -0.25rem;
  background-color: var(--border);
}
</style>
