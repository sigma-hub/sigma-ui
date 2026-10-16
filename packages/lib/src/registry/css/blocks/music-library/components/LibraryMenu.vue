<script setup lang="ts">
import { Menubar, MenubarContent, MenubarMenu, MenubarTrigger } from '@ui/registry/css/ui/menubar';
import MenuEntries from './MenuEntries.vue';
import type { MenuGroup } from '../data';

defineProps<{
  groups: MenuGroup[];
}>();
</script>

<template>
  <Menubar class="music-library__menu">
    <MenubarMenu
      v-for="group in groups"
      :key="group.label"
    >
      <MenubarTrigger
        :class="[
          group.bold ? 'music-library__menu-trigger--bold' : undefined,
          group.compact ? 'music-library__menu-trigger--compact' : undefined,
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

<style>
.music-library__menu {
  padding: 0 0.5rem;
  border: none;
  border-radius: 0;
  border-bottom: 1px solid var(--border);
}

.music-library__menu-trigger--bold {
  font-weight: 700;
}

.music-library__menu-trigger--compact {
  display: none;
}

@media (width >= 768px) {
  .music-library__menu-trigger--compact {
    display: flex;
  }
}

@media (width >= 1024px) {
  .music-library__menu {
    padding: 0 1rem;
  }
}
</style>
