<script setup lang="ts">
import { MenubarMenu, type MenubarMenuProps } from 'reka-ui';

const props = defineProps<MenubarMenuProps>();
</script>

<template>
  <MenubarMenu
    v-bind="props"
    data-slot="menubar-menu"
  >
    <slot />
  </MenubarMenu>
</template>
