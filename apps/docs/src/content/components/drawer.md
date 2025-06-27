---
title: Drawer
description: Mobile-style drawer panel that slides in from the bottom of the screen.
source: apps/docs/src/lib/registry/tailwind/ui/drawer
primitive: https://github.com/unovue/vaul-vue
---

## Preview

<ComponentPreview name="Drawer" />

## About

Drawer is built on top of [Vaul Vue](https://github.com/unovue/vaul-vue).

## Installation

```bash
npx sigma-ui add drawer
```

## Examples

### Basic

```vue:line-numbers
<script setup lang="ts">
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
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
        <DrawerClose>
          <Button variant="outline">
            Cancel
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>
```

### Scale Background

If you want the background to have a zoom effect, you need to add the `vaul-drawer-wrapper` attribute to the root component.

```html
<div vaul-drawer-wrapper id="app"></div>
```

### Responsive Dialog

You can combine the `Dialog` and `Drawer` components to create a responsive dialog. This renders a `Dialog` component on desktop and a `Drawer` on mobile.

<ComponentPreview name="DrawerDialog" />
