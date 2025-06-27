<script setup lang="ts">
import { MenubarLabel, type MenubarLabelProps } from 'reka-ui';
import { cn } from '@ui/utils';

const props = defineProps<MenubarLabelProps & { inset?: boolean }>();
</script>

<template>
  <MenubarLabel :class="cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', $attrs.class ?? '')">
    <slot />
  </MenubarLabel>
</template>
