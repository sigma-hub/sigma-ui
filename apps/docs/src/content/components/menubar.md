---
title: Menubar
description: Common in desktop applications, menu bar that provides quick access to a set of commands.
source: packages/lib/src/registry/tailwind/ui/menubar
primitive: https://www.reka-ui.com/docs/components/menubar.html
---

## Preview

<ComponentPreview name="Menubar" />

## Installation

```bash
npx sigma-ui add menubar
```

## Examples

### Basic

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
} from '@/components/ui/menubar'
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
