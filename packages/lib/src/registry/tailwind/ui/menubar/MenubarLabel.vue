<script setup lang="ts">
import { MenubarLabel, type MenubarLabelProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<MenubarLabelProps & {
  /** Adds left padding so the text lines up with items that have an icon or indicator. */
  inset?: boolean;
}>();
</script>

<template>
  <MenubarLabel :class="cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', $attrs.class ?? '')"
  data-slot="menubar-label">
    <slot />
  </MenubarLabel>
</template>
