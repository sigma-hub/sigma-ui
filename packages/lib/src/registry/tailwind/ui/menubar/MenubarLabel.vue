<script setup lang="ts">
import { computed, useAttrs } from 'vue';

import { MenubarLabel, type MenubarLabelProps } from 'reka-ui';
import { cn } from '@ui/utils';
defineOptions({
  inheritAttrs: false,
});

const delegatedAttrs = computed(() => {
  return Object.fromEntries(Object.entries(useAttrs()).filter(([key]) => key !== 'class'));
});

const props = defineProps<MenubarLabelProps & {
  /** Adds left padding so the text lines up with items that have an icon or indicator. */
  inset?: boolean;
}>();
</script>

<template>
  <MenubarLabel
    v-bind="delegatedAttrs"
    :class="cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', $attrs.class ?? '')"
    data-slot="menubar-label"
  >
    <slot />
  </MenubarLabel>
</template>
