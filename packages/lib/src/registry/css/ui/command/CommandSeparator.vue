<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ComboboxSeparatorProps } from 'reka-ui';
import { ComboboxSeparator } from 'reka-ui';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<ComboboxSeparatorProps>();
</script>

<template>
  <ComboboxSeparator
    v-bind="{ ...props, ...delegatedAttrs }"
    class="sigma-ui-command-separator"
    data-slot="command-separator"
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
