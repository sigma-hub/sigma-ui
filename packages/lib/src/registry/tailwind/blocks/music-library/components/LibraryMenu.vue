<script setup lang="ts">
import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger } from '@ui/registry/tailwind/ui/menubar';
import MenuEntries from './MenuEntries.vue';
import type { MenuGroup } from '../data';

defineProps<{
  groups: MenuGroup[];
}>();
</script>

<template>
  <Menubar class="rounded-none border-b border-none px-2 lg:px-4">
    <MenubarMenu
      v-for="group in groups"
      :key="group.label"
    >
      <MenubarTrigger
        :class="[
          group.bold ? 'font-bold' : undefined,
          group.compact ? 'hidden md:flex' : undefined,
        ]"
      >
        {{ group.label }}
      </MenubarTrigger>
      <MenubarContent>
        <MenuEntries :entries="group.entries" />
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
