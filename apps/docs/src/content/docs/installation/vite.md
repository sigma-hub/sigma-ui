---
title: Vite
description: Initialize SIGMA-UI in a Vite project.
---

<script setup lang="ts">
import { Tabs, TabsList, TabsTrigger } from '@ui/registry/tailwind/ui/tabs'
import { ref } from 'vue'

const installationType = ref<'quick' | 'detailed'>('quick')
</script>

## Installation steps

<Tabs
  v-model="installationType"
  default-value="quick"
>
  <TabsList class="h-8">
    <TabsTrigger
      value="quick"
    >
      Quick
    </TabsTrigger>
    <TabsTrigger
      value="detailed"
    >
      More detailed
    </TabsTrigger>
  </TabsList>
</Tabs>

<Steps v-if="installationType === 'quick'">

### Initialize SIGMA-UI

In your existing Vite-Vue project, run the following command to config SIGMA-UI (learn more in: [CLI docs > init](/docs/cli.html)):

```bash
npx sigma-ui init
```

And follow the steps in your terminal.

### Check styles import

`init` writes `src/assets/index.css` as CSS-first Tailwind v4 and installs `tw-animate-css`. It does not create a `tailwind.config.js`. Import that file from the app entry:

```diff typescript {3}
import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'

createApp(App).mount('#app')
```

The stylesheet starts like this:

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-primary: var(--primary);
  --radius-lg: var(--radius);
}
```

### Check tsconfig

Make sure your `tsconfig.json` is configured correctly so that SIGMA-UI CLI commands can resolve alias paths and install components into your components dir:

```json {3-6}
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Add components

You can now start adding [components](/components/accordion.html) to your project (learn more in: [CLI docs > add](/docs/cli.html)):

```bash
npx sigma-ui add button
```

The command above will add the `Button` component to your project. You can then import and use it like this:

```vue {2,6}
<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <Button>Click me</Button>
</template>
```

</Steps>

<Steps v-if="installationType === 'detailed'">

If something is not working, read these more detailed instructions:

### Create project (optional step)

If you don't have a Vite-Vue project yet, create it first. Here's an example using `vite` (see their [docs](https://vite.dev/guide) for more details):

```bash
npm create vite@latest my-vue-app -- --template vue
```

### Initialize SIGMA-UI

In your existing Vite-Vue project, run the following command to config SIGMA-UI (learn more in: [CLI docs > init](/docs/cli.html)):

```bash
npx sigma-ui init
```

And follow the steps in your terminal.

### Check styles import

`init` writes `src/assets/index.css` as CSS-first Tailwind v4 and installs `tw-animate-css`. It does not create a `tailwind.config.js`. Import that file from the app entry:

```diff typescript {3}
import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'

createApp(App).mount('#app')
```

The stylesheet starts like this:

```css
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme inline {
  --color-background: var(--background);
  --color-primary: var(--primary);
  --radius-lg: var(--radius);
}
```

### Check tsconfig

Make sure your `tsconfig.json` is configured correctly so that SIGMA-UI CLI commands can resolve alias paths and install components into your components dir:

```json {3-6}
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### Check vite.config

Make sure your `vite.config.ts` is configured correctly so your app can resolve paths correctly

```typescript {4-6}
export default defineConfig({
  // ...
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

#### Optional

In case you get an error importing "path", install node types:

```bash
npm i -D @types/node
```

### Tailwind CSS

For the Tailwind style system, `init` installs `tailwindcss`, `@tailwindcss/vite`, and `tw-animate-css`, registers the Vite plugin, and writes `src/assets/index.css`. Theme tokens live in that file under `@theme inline`. There is no `tailwind.config.js`.

Install the same packages yourself when you set Tailwind up by hand:

```bash
npm install -D tailwindcss @tailwindcss/vite
npm install tw-animate-css
```

```typescript
import path from 'node:path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

### Add components

You can now start adding [components](/components/accordion.html) to your project (learn more in: [CLI docs > add](/docs/cli.html)):

```bash
npx sigma-ui add button
```

The command above will add the `Button` component to your project. You can then import and use it like this:

```vue {2,6}
<script setup lang="ts">
import { Button } from '@/components/ui/button'
</script>

<template>
  <Button>Click me</Button>
</template>
```

</Steps>
