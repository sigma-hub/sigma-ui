---
title: Command
description: Composable command menu (command palette) with search.
source: apps/docs/src/lib/registry/tailwind/ui/command
primitive: https://www.reka-ui.com/docs/components/listbox
---

## Preview

<ComponentPreview name="Command" />

## Installation

```bash
npx sigma-ui add command
```

## Examples

### Basic

<ComponentPreview name="Command" />

### Dialog

To show the command menu in a dialog, use the `<CommandDialog />` component:

<ComponentPreview name="CommandDialog" />

### Popover

<ComponentPreview name="CommandPopover" />

### Dropdown menu

<ComponentPreview name="CommandDropdownMenu" />

### Responsive

You can create a responsive combobox by using the `<Popover />` on desktop and the `<Drawer />` components on mobile.

<ComponentPreview name="CommandResponsive" />

### Form

<ComponentPreview name="CommandForm" />

### Combobox

You can use the `<Command />` component as a combobox. See the [Combobox](./combobox) page for more information.
