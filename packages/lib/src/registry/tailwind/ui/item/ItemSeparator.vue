<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import type { SeparatorProps } from 'reka-ui';
import { Separator } from '@ui/registry/tailwind/ui/separator';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'horizontal',
});
</script>

<template>
  <Separator
    v-bind="{ ...props, ...delegatedAttrs }"
    data-slot="item-separator"
    :class="cn('my-0', $attrs.class ?? '')"
  />
</template>
