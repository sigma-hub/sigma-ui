---
title: Laravel
description: Install sigma-ui in a Laravel project.
---

## Create a project

```bash
laravel new my-app --typescript --breeze --stack=vue --git --no-interaction
```

## Remove a JavaScript Tailwind config

`sigma-ui init` writes CSS-first Tailwind v4 into `resources/css/app.css` and installs `tw-animate-css`. It does not create or update a `tailwind.config.js`.

Older Laravel starter kits ship `tailwind.config.js`. Delete that file before you run init. While it exists, init keeps it and points the stylesheet at it with `@config`.

## Install Tailwind CSS

Install Tailwind v4 and the Vite plugin if the project does not have them yet:

```bash
npm install -D tailwindcss @tailwindcss/vite
npm install tw-animate-css
```

Register the plugin in `vite.config.ts`:

```ts
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import laravel from 'laravel-vite-plugin';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/css/app.css', 'resources/js/app.ts'],
      refresh: true,
    }),
    tailwindcss(),
    vue(),
  ],
});
```

## Initialize sigma-ui

```bash
npx sigma-ui init
```

Init rewrites `resources/css/app.css`. The theme lives in that file:

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --radius-lg: var(--radius);
}
```

`resources/js/app.ts` should still import the stylesheet through Vite, which the Laravel starter already does.

## Add components

```bash
npx sigma-ui add button
```

```vue
<script setup lang="ts">
import { Button } from '@/components/ui/button';
</script>

<template>
  <Button>Click me</Button>
</template>
```
