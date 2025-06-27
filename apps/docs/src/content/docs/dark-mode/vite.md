---
title: Vite
description: Adding dark mode to your vite app.
---

## Method 1: Using `@vueuse/useColorMode`

This example demonstrates how to add theme mode toggle using [`useColorMode`](https://vueuse.org/core/usecolormode) from [`@vueuse/core`](https://vueuse.org/core).

**Pros**:
- Lets you reactively change color mode (dark / light / system) with auto data persistence;
- No need for a custom implementation;

Follow their docs [here](https://vueuse.org/core/usecolormode) to learn more.

<Steps>

### Install Dependencies

```bash
npm install @vueuse/core
```

### Add mode toggle to UI

```vue
<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { MoonIcon, SunIcon } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

const mode = useColorMode()
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
      <DropdownMenuItem @click="mode = 'light'">
        Light
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'dark'">
        Dark
      </DropdownMenuItem>
      <DropdownMenuItem @click="mode = 'auto'">
        System
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
```

</Steps>
