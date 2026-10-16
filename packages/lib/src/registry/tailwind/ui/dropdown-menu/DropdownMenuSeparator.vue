<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import {
  DropdownMenuSeparator,
  type DropdownMenuSeparatorProps,
} from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<DropdownMenuSeparatorProps>();
</script>

<template>
  <DropdownMenuSeparator
    v-bind="{ ...props, ...delegatedAttrs }"
    :class="cn('-mx-1 my-1 h-px bg-muted', $attrs.class ?? '')"
    data-slot="dropdown-menu-separator"
  />
</template>
