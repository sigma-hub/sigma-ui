---
title: Drawer
description: Mobile-style drawer panel that slides in from the bottom of the screen.
source: drawer
primitive: https://github.com/unovue/vaul-vue
---

## Preview

<ComponentPreview name="Drawer" />

## Installation

<ComponentInstall name="drawer" />

## Usage

Drawer is built on top of [Vaul Vue](https://github.com/unovue/vaul-vue).

```vue
<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
</script>

<template>
  <Drawer>
    <DrawerTrigger>Open</DrawerTrigger>
    <DrawerContent>
      <DrawerHeader>
        <DrawerTitle>Are you absolutely sure?</DrawerTitle>
        <DrawerDescription>This action cannot be undone.</DrawerDescription>
      </DrawerHeader>
      <DrawerFooter>
        <Button>Submit</Button>
        <DrawerClose as-child>
          <Button variant="outline">
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
```

- Use `v-model:open` on `<Drawer>` to control the open state.
- The user can close the drawer by dragging it down, clicking the overlay, or pressing <kbd>Esc</kbd>.

### Scale Background

`shouldScaleBackground` is enabled by default. For the background to get a zoom effect, add the `vaul-drawer-wrapper` attribute to the root element of your app.

```html
<div vaul-drawer-wrapper id="app"></div>
```

## Examples

### Responsive Dialog

Combine the `Dialog` and `Drawer` components to create a responsive dialog. It renders a `Dialog` on desktop and a `Drawer` on mobile.

<ComponentPreview name="DrawerDialog" />

## API Reference

<!-- @include: @/content/meta/drawer.md -->

## Accessibility

Renders as a modal dialog following the [Dialog (Modal) WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/). Vaul Vue builds on the Reka UI dialog, which traps focus inside the drawer and returns it to the trigger on close.

| Key | Description |
| --- | --- |
| <kbd>Space</kbd> | Opens or closes the drawer. |
| <kbd>Enter</kbd> | Opens or closes the drawer. |
| <kbd>Tab</kbd> | Moves focus to the next focusable element. |
| <kbd>Shift</kbd> + <kbd>Tab</kbd> | Moves focus to the previous focusable element. |
| <kbd>Esc</kbd> | Closes the drawer and moves focus to the trigger. |
