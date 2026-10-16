---
title: Nuxt
description: Install sigma-ui in a Nuxt 4 project.
---

## Create a project

Create a Nuxt 4 project if you do not already have one:

```bash
npx nuxi@latest init my-app
```

Nuxt 4 keeps the application source in `app/`. `@/` and `~/` both point at that directory.

## Install Tailwind CSS

Install Tailwind v4 and the Vite plugin when you want the Tailwind components:

```bash
npm install -D tailwindcss @tailwindcss/vite
npm install tw-animate-css
```

Do not install `@nuxtjs/tailwindcss`. That module targets Tailwind v3. While it is installed, `sigma-ui-nuxt` skips `@tailwindcss/vite` and logs a warning.

Skip this step if you choose the CSS style system during initialization. That path does not use Tailwind.

## Add the module

```bash
npx nuxi module add sigma-ui-nuxt
```

The module auto-imports every component exported from `app/components/ui/<name>/index.ts`. When `@tailwindcss/vite` is installed and not already listed in `vite.plugins`, the module registers it. You do not copy a module into the project.

## Initialize sigma-ui

```bash
npx sigma-ui init
```

On a Nuxt 4 project, init writes `app/assets/css/tailwind.css` and adds `~/assets/css/tailwind.css` to the `css` array in `nuxt.config.ts`. With the Tailwind style system it also installs `clsx`, `tailwind-merge`, and `tw-animate-css`, and adds `tailwindcss()` from `@tailwindcss/vite` to `vite.plugins`.

The stylesheet is CSS-first. Init does not create a `tailwind.config.js`.

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

```ts
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  modules: ['sigma-ui-nuxt'],
  css: ['~/assets/css/tailwind.css'],
  vite: {
    plugins: [tailwindcss()],
  },
  sigmaUi: {
    /**
     * Prefix for every auto-imported component. 'Ui' turns Button into UiButton.
     */
    prefix: '',
    /**
     * Directory the CLI copies components into. In Nuxt 4 this is app/components/ui.
     * Keep it in sync with aliases.components in sigma-ui.config.json.
     */
    componentDir: '@/components/ui',
  },
})
```

`sigmaUi.tailwind` controls the Vite plugin. `'auto'` (the default) registers `@tailwindcss/vite` when it is installed and not already configured. `true` also warns when the package is missing. `false` never registers it.

## Add components

```bash
npx sigma-ui add button
```

The module imports the component for you:

```vue
<template>
  <Button>Click me</Button>
</template>
```

With `prefix: 'Ui'`, use `<UiButton>` instead.
