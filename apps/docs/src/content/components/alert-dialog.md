---
title: Alert Dialog
description: A modal dialog that interrupts the user with important content and expects a response.
source: alert-dialog
primitive: https://reka-ui.com/docs/components/alert-dialog
---

## Preview

<ComponentPreview name="AlertDialog" />

## Installation

<ComponentInstall name="alert-dialog" />

## Usage

```vue
<script setup lang="ts">
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
</script>

<template>
  <AlertDialog>
    <AlertDialogTrigger>Open</AlertDialogTrigger>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction>Continue</AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>
```

- Use `v-model:open` on `<AlertDialog>` to control the open state.
- Unlike a regular dialog, it does not close when you click outside. The user has to pick `<AlertDialogCancel>` or `<AlertDialogAction>`.

## Examples

### Basic

<ComponentPreview name="AlertDialogBasic" />

## API Reference

<!-- @include: @/content/meta/alert-dialog.md -->

## Accessibility

Adheres to the [Alert and Message Dialogs WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/). Reka UI traps focus inside the dialog and returns it to the trigger on close.

| Key | Description |
| --- | --- |
| <kbd>Space</kbd> | Opens or closes the dialog. |
| <kbd>Enter</kbd> | Opens or closes the dialog. |
| <kbd>Tab</kbd> | Moves focus to the next focusable element. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moves focus to the previous focusable element. |
| <kbd>Esc</kbd> | Closes the dialog and moves focus to the trigger. |
