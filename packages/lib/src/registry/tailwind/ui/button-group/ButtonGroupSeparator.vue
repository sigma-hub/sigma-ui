<script setup lang="ts">
import { useAttrs } from 'vue';

import type { SeparatorProps } from 'reka-ui';
import { Separator } from '@ui/registry/tailwind/ui/separator';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = withDefaults(defineProps<SeparatorProps>(), {
  orientation: 'vertical',
});
</script>

<template>
  <Separator
    data-slot="button-group-separator"
    v-bind="{ ...props, ...delegatedAttrs() }"
    :class="cn('relative m-0! self-stretch bg-border data-[orientation=vertical]:h-auto', $attrs.class ?? '')"
  />
</template>
