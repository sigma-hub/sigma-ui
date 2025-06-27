---
title: Astro
description: Adding dark mode to your astro app.
---

## Method 1: Using `@vueuse/useColorMode`

This example demonstrates how to add theme mode toggle using [`useColorMode`](https://vueuse.org/core/usecolormode) from [`@vueuse/core`](https://vueuse.org/core).

**Pros**:
- Lets you reactively change color mode (dark / light / system) with auto data persistence;
- No need for a custom implementation;

Follow their docs [here](https://vueuse.org/core/usecolormode) to learn more.

<Steps>

### Create an inline theme script

```astro title="src/pages/index.astro"
---
import '../styles/globals.css'
---

<script is:inline>
	const getThemePreference = () => {
		if (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) {
			return localStorage.getItem('theme');
		}
		return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	};
	const isDark = getThemePreference() === 'dark';
	document.documentElement.classList[isDark ? 'add' : 'remove']('dark');

	if (typeof localStorage !== 'undefined') {
		const observer = new MutationObserver(() => {
			const isDark = document.documentElement.classList.contains('dark');
			localStorage.setItem('theme', isDark ? 'dark' : 'light');
		});
		observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
	}
</script>

<html lang="en">
	<body>
      <h1>Astro</h1>
	</body>
</html>
</script>
```

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

### Display the mode toggle

Place the toggle on your site to toggle between light and dark mode.

```astro title="src/pages/index.astro"
import '../styles/globals.css'
import { ModeToggle } from '@/components/ModeToggle.vue';

...

<html lang="en">
	<body>
      <h1>Astro</h1>
      <ModeToggle client:load />
	</body>
</html>
```

</Steps>
