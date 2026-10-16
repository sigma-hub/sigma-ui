<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { SelectSeparator, type SelectSeparatorProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<SelectSeparatorProps>();
</script>

<template>
  <SelectSeparator
    v-bind="{ ...props, ...delegatedAttrs }"
    data-slot="select-separator"
    :class="cn('-mx-1 my-1 h-px bg-border pointer-events-none', $attrs.class ?? '')"
  />
</template>
