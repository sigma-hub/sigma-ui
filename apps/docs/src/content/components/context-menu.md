---
title: Context Menu
description: Displays a menu located at the pointer, triggered by a right-click or a long-press.
source: context-menu
primitive: https://reka-ui.com/docs/components/context-menu
---

## Preview

<ComponentPreview name="ContextMenu" />

## Installation

<ComponentInstall name="context-menu" />

## Usage

```vue
<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>Right click</ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>Profile</ContextMenuItem>
      <ContextMenuItem>Billing</ContextMenuItem>
      <ContextMenuItem>Team</ContextMenuItem>
      <ContextMenuItem>Subscription</ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>
```

- `<ContextMenuTrigger>` is the area that opens the menu on right-click or long-press.
- Use `<ContextMenuCheckboxItem>` with `v-model` and `<ContextMenuRadioGroup>` / `<ContextMenuRadioItem>` for items with a checked state.
- Nest `<ContextMenuSub>`, `<ContextMenuSubTrigger>` and `<ContextMenuSubContent>` to build submenus.

## Examples

### Shortcuts, Submenus and Checkable Items

Combines `<ContextMenuShortcut>`, a submenu, checkbox items and a radio group in one menu.

```vue
<script setup lang="ts">
import { ref } from 'vue';
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';

const showBookmarks = ref(true);
const person = ref('pedro');
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>Right click</ContextMenuTrigger>
    <ContextMenuContent>
      <ContextMenuItem>
        Back
        <ContextMenuShortcut>⌘[</ContextMenuShortcut>
      </ContextMenuItem>
      <ContextMenuSub>
        <ContextMenuSubTrigger>More Tools</ContextMenuSubTrigger>
        <ContextMenuSubContent>
          <ContextMenuItem>Save Page As...</ContextMenuItem>
          <ContextMenuItem>Developer Tools</ContextMenuItem>
        </ContextMenuSubContent>
      </ContextMenuSub>
      <ContextMenuSeparator />
      <ContextMenuCheckboxItem v-model="showBookmarks">
        Show Bookmarks Bar
      </ContextMenuCheckboxItem>
      <ContextMenuSeparator />
      <ContextMenuLabel>People</ContextMenuLabel>
      <ContextMenuRadioGroup v-model="person">
        <ContextMenuRadioItem value="pedro">
          Pedro Duarte
        </ContextMenuRadioItem>
        <ContextMenuRadioItem value="colm">
          Colm Tuite
        </ContextMenuRadioItem>
      </ContextMenuRadioGroup>
    </ContextMenuContent>
  </ContextMenu>
</template>
```

## API Reference

<!-- @include: @/content/meta/context-menu.md -->

## Accessibility

Uses the roving focus pattern of the [Menu WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/). Reka UI manages focus and the `menu` / `menuitem` roles.

| Key | Description |
| --- | --- |
| <kbd>Space</kbd> | Activates the focused item. |
| <kbd>Enter</kbd> | Activates the focused item. |
| <kbd>ArrowDown</kbd> | Moves focus to the next item. |
| <kbd>ArrowUp</kbd> | Moves focus to the previous item. |
| <kbd>ArrowRight</kbd> | When focus is on a submenu trigger, opens the submenu. |
| <kbd>ArrowLeft</kbd> | When focus is on an item of a submenu, closes the submenu and moves focus to its trigger. |
| <kbd>Esc</kbd> | Closes the context menu. |
