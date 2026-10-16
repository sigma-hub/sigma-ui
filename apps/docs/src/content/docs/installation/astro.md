---
title: Astro
description: Install sigma-ui in an Astro project.
---

## Create a project

Create an Astro project and add Vue:

```bash
npm create astro@latest
npx astro add vue
```

## Install Tailwind CSS

Install Tailwind v4 and the Vite plugin. Astro runs Vite, so the plugin is registered under `vite.plugins`. This does not use `@astrojs/tailwind` and does not create a `tailwind.config.mjs`.

```bash
npm install -D tailwindcss @tailwindcss/vite
npm install tw-animate-css
```

```js
import vue from '@astrojs/vue';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'astro/config';

export default defineConfig({
  integrations: [vue()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

If an older setup left a `tailwind.config.mjs` in the project, delete it before initialization. While that file exists, `sigma-ui init` keeps it and references it with `@config`.

## Initialize sigma-ui

```bash
npx sigma-ui init
```

Init writes `src/styles/globals.css` as CSS-first Tailwind v4. The file imports Tailwind and `tw-animate-css`, and defines the theme with `@theme inline`. Import it from your root layout:

```astro
---
import '@/styles/globals.css';
---
```

Make sure `tsconfig.json` can resolve the `@/` alias:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

## Add components

```bash
npx sigma-ui add button
```

```astro
---
import { Button } from '@/components/ui/button';
---

<html lang="en">
  <body>
    <Button>Click me</Button>
  </body>
</html>
```
