<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { ComboboxSeparatorProps } from 'reka-ui';
import { ComboboxSeparator } from 'reka-ui';
import { cn } from '@ui/utils';
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
    :class="cn('-mx-1 h-px bg-border', $attrs.class ?? '')"
    data-slot="combobox-separator"
  >
    <slot />
  </ComboboxSeparator>
</template>
