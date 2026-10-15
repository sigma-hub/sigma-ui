---
title: Dialog
description: Container for displaying content on top of other content.
source: dialog
primitive: https://reka-ui.com/docs/components/dialog
---

## Preview

<ComponentPreview name="Dialog" />

## Installation

<ComponentInstall name="dialog" />

## Usage

```vue
<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
</script>

<template>
  <Dialog>
    <DialogTrigger>
      Edit Profile
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit profile</DialogTitle>
        <DialogDescription>
          Make changes to your profile here. Click save when you're done.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        Save changes
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
```

- Use `v-model:open` on `<Dialog>` to control the open state.
- Use `<DialogClose>` to render your own close control.
- Use `<DialogScrollContent>` instead of `<DialogContent>` when the overlay itself should scroll.

### Opening from a menu

To open a `Dialog` from a `Context Menu` or `Dropdown Menu`, wrap the menu in the `Dialog` component. For more information, see [this issue](https://github.com/radix-ui/primitives/issues/1836).

```vue
<template>
  <Dialog>
    <ContextMenu>
      <ContextMenuTrigger>Right click</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem>Open</ContextMenuItem>
        <ContextMenuItem>Download</ContextMenuItem>
        <DialogTrigger as-child>
          <ContextMenuItem>
            <span>Delete</span>
          </ContextMenuItem>
        </DialogTrigger>
      </ContextMenuContent>
    </ContextMenu>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. Are you sure you want to permanently
          delete this file from our servers?
        </DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button type="submit">
          Confirm
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
```

## Examples

### Custom close button

<ComponentPreview name="DialogCustomCloseButton" />

### Scroll body

The content scrolls inside the dialog while the header and footer stay in place.

<ComponentPreview name="DialogScrollBody" />

### Scroll overlay

The whole dialog scrolls inside the overlay with `<DialogScrollContent>`.

<ComponentPreview name="DialogScrollOverlay" />

## API Reference

<!-- @include: @/content/meta/dialog.md -->

## Accessibility

Adheres to the [Dialog (Modal) WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/). Reka UI traps focus inside the dialog and returns it to the trigger on close.

| Key | Description |
| --- | --- |
| <kbd>Space</kbd> | Opens or closes the dialog. |
| <kbd>Enter</kbd> | Opens or closes the dialog. |
| <kbd>Tab</kbd> | Moves focus to the next focusable element. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moves focus to the previous focusable element. |
| <kbd>Esc</kbd> | Closes the dialog and moves focus to the trigger. |
