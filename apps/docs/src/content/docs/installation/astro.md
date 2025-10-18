---
title: Astro
description: Initialize SIGMA-UI in a Astro project.
---

<Steps>

### Create project (optional step)

If you don't have an Astro project yet, create it first. Here's an example using `astro` CLI:

```bash
npm create astro@latest
```

And then add Vue to your Astro project:

```bash
npx astro add vue
```

<Callout class="mt-4">

Answer `Yes` to all the question prompted by the CLI when installing Vue.

</Callout>

This will install `vue` and `@astrojs/vue` as dependencies and automatically set them up in the `astro.config.mjs` file.

### Install TypeScript

If you encounter the error `Cannot find module 'typescript'`, install TypeScript as a dev dependency:

```bash
npm install -D typescript
```

### Add Tailwind CSS to your project

If you want to use Tailwind version of the SIGMA-UI components, and you don't already have Tailwind setup in your project, install the TailwindCSS module as well:

```bash
npx astro add tailwind
```

This will install `tailwindcss` and `@astrojs/tailwind` as dependencies and set them up in your `astro.config.mjs` file. It will also create a `tailwind.config.mjs` file with the needed configurations.

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


### Initialize SIGMA-UI

In your existing Astro project, run the following command to config SIGMA-UI (learn more in: [CLI docs > init](/docs/cli.html)):

```bash
npx sigma-ui init
```

And follow the steps in your terminal.

### Import the globals.css file

Import the `globals.css` file in the `src/index.astro` file:

```ts {2}
import '@/styles/globals.css'
```

### Update astro tailwind config
To prevent serving the Tailwind base styles twice, we need to tell Astro not to apply the base styles, since we already include them in our own `globals.css` file. To do this, set the `applyBaseStyles` config option for the tailwind plugin in `astro.config.mjs` to `false`.

```ts {3-5}
export default defineConfig({
  integrations: [
    tailwind({
      applyBaseStyles: false,
    }),
  ],
})
```

### Add components

You can now start adding [components](/components/accordion.html) to your project (learn more in: [CLI docs > add](/docs/cli.html)):

```bash
npx sigma-ui add button
```

The command above will add the `Button` component to your project. You can then import and use it like this:

```astro {1,10}
import { Button } from "@/components/ui/button"

...

<html lang="en">
 <head>
  <title>Astro</title>
 </head>
 <body>
  <Button>Click me</Button>
 </body>
</html>
```

</Steps>
