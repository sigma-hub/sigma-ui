<script setup lang="ts">
import { useAttrs } from 'vue';

import {
  ContextMenuSeparator,
  type ContextMenuSeparatorProps,
} from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const attrs = useAttrs();

const delegatedAttrs = () => {
  return Object.fromEntries(Object.entries(attrs).filter(([key]) => key !== 'class'));
};

const props = defineProps<ContextMenuSeparatorProps>();
</script>

<template>
  <ContextMenuSeparator
    v-bind="{ ...props, ...delegatedAttrs() }"
    :class="cn('-mx-1 my-1 h-px bg-border', $attrs.class ?? '')"
    data-slot="context-menu-separator"
  />
</template>
