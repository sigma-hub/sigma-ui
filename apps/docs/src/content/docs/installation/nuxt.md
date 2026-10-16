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

Install Tailwind v4 and its Vite plugin when you want the Tailwind components:

```bash
npm install -D tailwindcss @tailwindcss/vite
npm install tw-animate-css
```

`sigma-ui-nuxt` registers `@tailwindcss/vite` for you. It does not use `@nuxtjs/tailwindcss`, which targets Tailwind v3. If that module is installed, `sigma-ui-nuxt` skips the Vite plugin and logs a warning.

Skip this step for the CSS style system. That path does not use Tailwind.

## Add the module

```bash
npx nuxi module add sigma-ui-nuxt
```

The module auto-imports every component exported from `app/components/ui/<name>/index.ts`. You do not paste a module into the project. When the project has no `@/lib/utils`, the module provides `cn()` itself.

## Initialize sigma-ui

```bash
npx sigma-ui init
```

On a Nuxt 4 project, init writes `app/assets/css/tailwind.css` and adds `~/assets/css/tailwind.css` to the `css` array in `nuxt.config.ts`.

With the Tailwind style system, that file starts with the Tailwind v4 imports and then defines the theme. Init does not create a `tailwind.config.js`. It installs `clsx`, `tailwind-merge`, and `tw-animate-css`, writes `@/lib/utils`, and adds `tailwindcss()` from `@tailwindcss/vite` to `vite.plugins` when Tailwind is not already set up:

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
})
```

The module leaves an existing `tailwindcss()` plugin in place. `sigmaUi.tailwind` controls what it does when the plugin is missing:

| Value | Behavior |
| --- | --- |
| `'auto'` (default) | Registers `@tailwindcss/vite` when it is installed. |
| `true` | Same as `'auto'`, and warns when the package is missing. |
| `false` | Never registers the plugin. |

```ts
export default defineNuxtConfig({
  modules: ['sigma-ui-nuxt'],
  sigmaUi: {
    // 'Ui' turns <Button> into <UiButton>.
    prefix: '',
    // Directory the CLI copies components into. Keep it in sync with
    // aliases.components in sigma-ui.config.json.
    componentDir: '@/components/ui',
    tailwind: 'auto',
  },
})
```

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
