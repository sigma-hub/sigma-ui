<script setup lang="ts">
import {
  MenubarCheckboxItem,
  MenubarItem,
  MenubarLabel,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
} from '@ui/registry/css/ui/menubar';
import MenuEntries from './MenuEntries.vue';
import type { MenuEntry } from '../data';

defineProps<{
  entries: MenuEntry[];
}>();
</script>

<template>
  <template
    v-for="(entry, index) in entries"
    :key="`${entry.kind}-${index}`"
  >
    <MenubarSeparator v-if="entry.kind === 'separator'" />
    <MenubarLabel
      v-else-if="entry.kind === 'label'"
      :inset="entry.inset"
    >
      {{ entry.label }}
    </MenubarLabel>
    <MenubarCheckboxItem
      v-else-if="entry.kind === 'checkbox'"
      :model-value="entry.checked"
    >
      {{ entry.label }}
    </MenubarCheckboxItem>
    <MenubarRadioGroup
      v-else-if="entry.kind === 'radio'"
      :model-value="entry.value"
    >
      <MenubarRadioItem
        v-for="option in entry.options"
        :key="option.value"
        :value="option.value"
      >
        {{ option.label }}
      </MenubarRadioItem>
    </MenubarRadioGroup>
    <MenubarSub v-else-if="entry.kind === 'submenu'">
      <MenubarSubTrigger>{{ entry.label }}</MenubarSubTrigger>
      <MenubarSubContent :class="entry.wide ? 'music-library__submenu--wide' : undefined">
        <MenuEntries :entries="entry.entries" />
      </MenubarSubContent>
    </MenubarSub>
    <MenubarItem
      v-else-if="entry.kind === 'item'"
      :disabled="entry.disabled"
      :inset="entry.inset"
    >
      {{ entry.label }}
      <MenubarShortcut v-if="entry.shortcut || entry.shortcutIcon">
        <component
          :is="entry.shortcutIcon"
          v-if="entry.shortcutIcon"
          class="music-library__shortcut-icon"
        />
        <template v-else>
          {{ entry.shortcut }}
        </template>
      </MenubarShortcut>
    </MenubarItem>
  </template>
</template>

<style>
.music-library__submenu--wide {
  width: 230px;
}

.music-library__shortcut-icon {
  width: 1rem;
  height: 1rem;
}
</style>
