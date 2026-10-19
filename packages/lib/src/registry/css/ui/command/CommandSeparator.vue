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
@layer base, components;

@layer components {
  .sigma-ui-command-separator {
    height: 1px;
    margin-right: calc(var(--spacing) * -1);
    margin-left: calc(var(--spacing) * -1);
    background-color: var(--border);
  }
}
</style>
