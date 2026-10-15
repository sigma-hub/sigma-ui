<script setup lang="ts">
import { MenubarGroup, type MenubarGroupProps } from 'reka-ui';

const props = defineProps<MenubarGroupProps>();
</script>

<template>
  <MenubarGroup v-bind="props"
  data-slot="menubar-group">
    <slot />
  </MenubarGroup>
</template>
