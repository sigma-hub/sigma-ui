<script setup lang="ts">
import { useAttrs } from 'vue';

import { SelectLabel, type SelectLabelProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

defineProps<SelectLabelProps>();
</script>

<template>
  <SelectLabel
    data-slot="select-label"
    v-bind="delegatedAttrs()"
    :class="cn('px-2 py-1.5 text-xs text-muted-foreground', $attrs.class ?? '')"
  >
    <slot />
  </SelectLabel>
</template>
