---
title: Sheet
description: Extends the Dialog component to display content that complements the main content of the screen.
source: sheet
primitive: https://reka-ui.com/docs/components/dialog
---

## Preview

<ComponentPreview name="Sheet" />

## Installation

<ComponentInstall name="sheet" />

## Usage

```vue
<script setup lang="ts">
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
</script>

<template>
  <Sheet>
    <SheetTrigger>Open</SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Are you absolutely sure?</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
```

Use `v-model:open` on `Sheet` to control the open state.

## Examples

### Side

Use the `side` property to `<SheetContent />` to indicate the edge of the screen where the component will appear. The values can be `top`, `right`, `bottom` or `left`.

<ComponentPreview name="SheetSide" />

### Size

You can adjust the size of the sheet using CSS classes:

```vue:line-numbers {4}
<template>
  <Sheet>
    <SheetTrigger>Open</SheetTrigger>
    <SheetContent class="w-[400px] sm:w-[540px]">
      <SheetHeader>
        <SheetTitle>Are you absolutely sure?</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
</template>
```

## API Reference

<!-- @include: @/content/meta/sheet.md -->

## Accessibility

Adheres to the [Dialog WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/). Reka UI traps focus inside the open sheet and returns it to the trigger on close. `SheetTitle` and `SheetDescription` label the content.

| Key | Description |
| --- | --- |
| <kbd>Space</kbd> | Opens or closes the sheet. |
| <kbd>Enter</kbd> | Opens or closes the sheet. |
| <kbd>Tab</kbd> | Moves focus to the next focusable element. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moves focus to the previous focusable element. |
| <kbd>Esc</kbd> | Closes the sheet and moves focus to the trigger. |
