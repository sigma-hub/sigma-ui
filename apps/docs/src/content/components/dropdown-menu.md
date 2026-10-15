---
title: Dropdown Menu
description: Displays a menu located at the trigger element.
source: dropdown-menu
primitive: https://reka-ui.com/docs/components/dropdown-menu
---

## Preview

<ComponentPreview name="DropdownMenu" />

## Installation

<ComponentInstall name="dropdown-menu" />

## Usage

```vue
<script setup lang="ts">
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger>Open</DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuLabel>My Account</DropdownMenuLabel>
      <DropdownMenuSeparator />
      <DropdownMenuItem>Profile</DropdownMenuItem>
      <DropdownMenuItem>Billing</DropdownMenuItem>
      <DropdownMenuItem>Team</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

- Use `as-child` on `<DropdownMenuTrigger>` to render your own trigger, such as a `<Button>`.
- Use `v-model:open` on `<DropdownMenu>` to control the open state.
- Use `<DropdownMenuCheckboxItem>` with `v-model` and `<DropdownMenuRadioGroup>` / `<DropdownMenuRadioItem>` for items with a checked state.

## Examples

### Basic

<ComponentPreview name="DropdownMenuBasic" />

### Checkboxes

<ComponentPreview name="DropdownMenuCheckboxes" />

### Radio Group

<ComponentPreview name="DropdownMenuRadioGroup" />

## API Reference

<!-- @include: @/content/meta/dropdown-menu.md -->

## Accessibility

Adheres to the [Menu Button WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/) and uses roving focus to move between items. Reka UI manages focus and the `menu` / `menuitem` roles.

| Key | Description |
| --- | --- |
| <kbd>Space</kbd> | When focus is on the trigger, opens the menu and focuses the first item. When focus is on an item, activates it. |
| <kbd>Enter</kbd> | When focus is on the trigger, opens the menu and focuses the first item. When focus is on an item, activates it. |
| <kbd>ArrowDown</kbd> | When focus is on the trigger, opens the menu. When focus is on an item, moves focus to the next item. |
| <kbd>ArrowUp</kbd> | When focus is on an item, moves focus to the previous item. |
| <kbd>ArrowRight</kbd> | When focus is on a submenu trigger, opens the submenu. |
| <kbd>ArrowLeft</kbd> | When focus is on an item of a submenu, closes the submenu and moves focus to its trigger. |
| <kbd>Esc</kbd> | Closes the menu and moves focus to the trigger. |
