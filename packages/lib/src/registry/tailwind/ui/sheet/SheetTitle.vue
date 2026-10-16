<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { DialogTitle, type DialogTitleProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<DialogTitleProps>();
</script>

<template>
  <DialogTitle
    v-bind="{ ...props, ...delegatedAttrs }"
    :class="cn('text-lg font-semibold text-foreground', $attrs.class ?? '')"
    data-slot="sheet-title"
  >
    <slot />
  </DialogTitle>
</template>
