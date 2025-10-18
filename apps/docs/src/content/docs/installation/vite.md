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

Make sure you are importing the global styles file that was created / modified by the `init` command:

```diff typescript {3}
import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'

createApp(App).mount('#app')
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

Make sure you are importing the global styles file that was created / modified by the `init` command:

```diff typescript {3}
import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'

createApp(App).mount('#app')
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

### Add Tailwind and its configuration

If you chose Tailwind style system during `init`, and don't already have Tailwind setup in your project, and didn't chose the option that automatically sets up Tailwind for you, you'll need to setup Tailwind yourself (see [Tailwind docs](https://tailwindcss.com/docs/installation/framework-guides) for more details):

#### Install Tailwind deps

Vite already has [`postcss`](https://github.com/vitejs/vite/blob/main/packages/vite/package.json#89) dependency so you don't have to install it again in your package.json

```bash
npm install -D tailwindcss @tailwindcss/vite
```

#### Configure Tailwind
If you are using a separate `postcss.config.js` file, see the `postcss.config.js` tab, otherwise config Tailwind directly in the `vite.config` file:

<TabsMarkdown>
  <TabMarkdown title="vite.config">

  #### `vite.config`

  ```typescript {4,5,14-18}
  import path from 'node:path'
  import { defineConfig } from 'vite'
  import vue from '@vitejs/plugin-vue'
  import tailwindcss from '@tailwindcss/vite'

  export default defineConfig({
    plugins: [
      vue(), 
      tailwindcss()
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  })
  ```

  </TabMarkdown>

<TabMarkdown title="postcss.config.js">

#### `postcss.config.js`

  ```js
  module.exports = {
    plugins: {
      "@tailwindcss/postcss": {},
    },
  }
  ```

  </TabMarkdown>
</TabsMarkdown>

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
