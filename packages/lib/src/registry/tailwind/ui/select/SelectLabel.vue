<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { SelectLabel, type SelectLabelProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<SelectLabelProps>();
</script>

<template>
  <SelectLabel
    v-bind="delegatedAttrs"
    data-slot="select-label"
    :class="cn('px-2 py-1.5 text-xs text-muted-foreground', $attrs.class ?? '')"
  >
    <slot />
  </SelectLabel>
</template>
