---
title: Command
description: Composable command menu (command palette) with search.
source: command
primitive: https://reka-ui.com/docs/components/listbox
---

## Preview

<ComponentPreview name="Command" />

## Installation

<ComponentInstall name="command" />

## Usage

```vue
<script setup lang="ts">
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
</script>

<template>
  <Command>
    <CommandInput placeholder="Type a command..." />
    <CommandList>
      <CommandEmpty>No results found.</CommandEmpty>
      <CommandGroup heading="Suggestions">
        <CommandItem value="calendar">
          Calendar
        </CommandItem>
      </CommandGroup>
    </CommandList>
  </Command>
</template>
```

Wrap it in `CommandDialog` for a command palette, or in `Popover` / `DropdownMenu` for an inline menu.

## Examples

### Basic

<ComponentPreview name="Command" />

### Dialog

<ComponentPreview name="CommandDialog" />

### Popover

<ComponentPreview name="CommandPopover" />

### Dropdown menu

<ComponentPreview name="CommandDropdownMenu" />

### Responsive

`Popover` on desktop and `Drawer` on mobile.

<ComponentPreview name="CommandResponsive" />

### Form

<ComponentPreview name="CommandForm" />

## API Reference

<!-- @include: @/content/meta/command.md -->

## Accessibility

The menu is a listbox. The input filters the options, and arrow keys move the active item. Reka UI sets `role="listbox"` and the active descendant.

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the search input. |
| <kbd>ArrowDown</kbd> | Moves to the next item. |
| <kbd>ArrowUp</kbd> | Moves to the previous item. |
| <kbd>Enter</kbd> | Runs the focused item. |
| <kbd>Escape</kbd> | Closes the menu when it is inside a dialog or popover. |
