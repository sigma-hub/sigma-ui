---
title: Menubar
description: Common in desktop applications, menu bar that provides quick access to a set of commands.
source: menubar
primitive: https://reka-ui.com/docs/components/menubar
---

## Preview

<ComponentPreview name="Menubar" />

## Installation

<ComponentInstall name="menubar" />

## Usage

```vue
<script setup lang="ts">
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from '@/components/ui/menubar';
</script>

<template>
  <Menubar>
    <MenubarMenu>
      <MenubarTrigger>File</MenubarTrigger>
      <MenubarContent>
        <MenubarItem>
          New Tab <MenubarShortcut>⌘T</MenubarShortcut>
        </MenubarItem>
        <MenubarItem>New Window</MenubarItem>
        <MenubarSeparator />
        <MenubarItem>Share</MenubarItem>
        <MenubarSeparator />
        <MenubarItem>Print</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
```

- Each `<MenubarMenu>` pairs a `<MenubarTrigger>` with its `<MenubarContent>`.
- Use `<MenubarCheckboxItem>`, `<MenubarRadioGroup>` / `<MenubarRadioItem>` and `<MenubarSub>` for checkable items and submenus, like in a dropdown menu.

## Examples

### Checkable Items

Use `v-model` on `<MenubarCheckboxItem>` and `<MenubarRadioGroup>` to track the checked state.

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarTrigger,
} from '@/components/ui/menubar';

const showStatusBar = ref(true);
const profile = ref('benoit');
</script>

<template>
  <Menubar>
    <MenubarMenu>
      <MenubarTrigger>View</MenubarTrigger>
      <MenubarContent>
        <MenubarCheckboxItem v-model="showStatusBar">
          Show Status Bar
        </MenubarCheckboxItem>
        <MenubarSeparator />
        <MenubarRadioGroup v-model="profile">
          <MenubarRadioItem value="andy">
            Andy
          </MenubarRadioItem>
          <MenubarRadioItem value="benoit">
            Benoit
          </MenubarRadioItem>
        </MenubarRadioGroup>
      </MenubarContent>
    </MenubarMenu>
  </Menubar>
</template>
```

## API Reference

<!-- @include: @/content/meta/menubar.md -->

## Accessibility

Adheres to the [Menubar WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/) and uses roving focus to move between triggers and items. Reka UI manages focus and the `menubar` / `menu` / `menuitem` roles.

| Key | Description |
| --- | --- |
| <kbd>Space</kbd> | When focus is on a trigger, opens its menu and focuses the first item. When focus is on an item, activates it. |
| <kbd>Enter</kbd> | When focus is on a trigger, opens its menu and focuses the first item. When focus is on an item, activates it. |
| <kbd>ArrowDown</kbd> | When focus is on a trigger, opens its menu. When focus is on an item, moves focus to the next item. |
| <kbd>ArrowUp</kbd> | When focus is on an item, moves focus to the previous item. |
| <kbd>ArrowRight</kbd> | When focus is on a trigger, moves focus to the next trigger. When focus is on a submenu trigger, opens the submenu. |
| <kbd>ArrowLeft</kbd> | When focus is on a trigger, moves focus to the previous trigger. When focus is on an item of a submenu, closes the submenu. |
| <kbd>Esc</kbd> | Closes the open menu and moves focus to its trigger. |
