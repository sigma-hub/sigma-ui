---
title: Nuxt
description: Adding dark mode to your nuxt app.
---

## Method 1: Using `@nuxtjs/color-mode`

This example demonstrates how to add theme mode toggle using [`Nuxt Color Mode`](https://color-mode.nuxtjs.org) module.

**Pros**:
- Lets you reactively change color mode (dark / light / system) with auto data persistence;
- Nuxt 3 and Nuxt Bridge support;
- Add .${color}-mode class to `<html>` for easy CSS theming;
- Force a page to a specific color mode (perfect for incremental development);
- Works with client-side and universal rendering;
- Works out of the box with @nuxtjs/tailwindcss;
- Auto detect system color-mode;
- Supports IE9+;
- No need for a custom implementation;

Follow their docs [here](https://color-mode.nuxtjs.org) to learn more.

<Steps>

### Install Dependencies

```bash
npm install -D @nuxtjs/color-mode
```

### Config

Add `@nuxtjs/color-mode` to the modules section of your `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode'
  ],
  colorMode: {
    classSuffix: ''
  }
})
```

### Add mode toggle to UI

```vue
<script setup lang="ts">
import { MoonIcon, SunIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const colorMode = useColorMode()
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button
        class="w-[fit-content]"
        variant="ghost"
      >
        <MoonIcon class="h-[20px] w-[20px] rotate-0 scale-100 transition-all duration-500 dark:-rotate-90 dark:scale-0" />
        <SunIcon class="h-[20px] w-[20px] absolute rotate-90 scale-0 transition-all duration-500 dark:rotate-0 dark:scale-100" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem @click="colorMode.preference = 'light'">
        Light
      </DropdownMenuItem>
      <DropdownMenuItem @click="colorMode.preference = 'dark'">
        Dark
      </DropdownMenuItem>
      <DropdownMenuItem @click="colorMode.preference = 'auto'">
        System
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

</Steps>
