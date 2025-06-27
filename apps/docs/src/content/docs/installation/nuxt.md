---
title: Nuxt
description: Initialize SIGMA-UI in a Nuxt project.
---

<Steps>

### Create project (optional step)

If you don't have a Nuxt project yet, create it first. Here's an example using `create-nuxt-app`:

```bash
npx nuxi@latest init my-app
```

### Install TypeScript

If you encounter the error `ERROR: Cannot read properties of undefined (reading 'sys') (x4)`, please proceed to install TypeScript as a dependency, as advised in this [issue](https://github.com/nuxt/nuxt/issues/20936)

```bash
npm install -D typescript
```

### Install TailwindCSS module (optional step)

If you want to use Tailwind version of the SIGMA-UI components, and you don't already have Tailwind setup in your project, install the TailwindCSS module as well:

```bash
npx nuxi@latest module add @nuxtjs/tailwindcss
```

### Add `Nuxt` module

Install the SIGMA-UI Nuxt module either manually or using the `sigma-ui-nuxt` module:

<TabsMarkdown>
  <TabMarkdown title="sigma-ui-nuxt">

  ```bash
 npx nuxi@latest module add sigma-ui-nuxt
  ```

  </TabMarkdown>

  <TabMarkdown title="manual">

  Add the following code to `modules/sigma-ui.ts`.

```bash
import {
  defineNuxtModule,
  addComponent,
  addComponentsDir,
  tryResolveModule,
} from 'nuxt/kit';

export interface SigmaUiOptions {
  /**
   * Prefix for all the imported component
   */
  prefix: string;

  /**
   * Directory that the component lives in.
   * @default "~/components/ui"
   */
  componentDir: string;
}

export default defineNuxtModule<SigmaUiOptions>({
  defaults: {
    prefix: 'Ui',
    componentDir: '~/components/ui',
  },
  meta: {
    name: 'SigmaUi',
    configKey: 'sigmaUi',
    version: '0.0.1',
    compatibility: {
      nuxt: '>=3.9.0',
      bridge: false,
    },
  },
  async setup({ componentDir, prefix }) {
    const isVeeValidateExist = await tryResolveModule('vee-validate');

    addComponentsDir(
      {
        path: componentDir,
        extensions: ['.vue'],
        prefix,
        pathPrefix: false,
      },
      {
        prepend: true,
      }
    );

    if (isVeeValidateExist !== undefined) {
      addComponent({
        filePath: 'vee-validate',
        export: 'Form',
        name: `${prefix}Form`,
        priority: 999,
      });

      addComponent({
        filePath: 'vee-validate',
        export: 'Field',
        name: `${prefix}FormField`,
        priority: 999,
      });
    }

    addComponent({
      filePath: 'reka-ui',
      export: 'PaginationRoot',
      name: `${prefix}Pagination`,
      priority: 999,
    });

    addComponent({
      filePath: 'reka-ui',
      export: 'PaginationList',
      name: `${prefix}PaginationList`,
      priority: 999,
    });

    addComponent({
      filePath: 'reka-ui',
      export: 'PaginationListItem',
      name: `${prefix}PaginationListItem`,
      priority: 999,
    });
  },
});

declare module '@nuxt/schema' {
  interface NuxtConfig {
    sigmaUi?: SigmaUiOptions;
  }
  interface NuxtOptions {
    sigmaUi?: SigmaUiOptions;
  }
}
```

  </TabMarkdown>
</TabsMarkdown>

### Configure `nuxt.config.ts`

```ts
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss', 'sigma-ui-nuxt'],
  sigmaUi: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  },
  css: ['./src/assets/index.css'],
})
```

Also make sure you have the `tsconfig.json` properly configured, so the components are added to the path you want:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

### Initialize SIGMA-UI

In your existing Nuxt project, run the following command to config SIGMA-UI (learn more in: [CLI docs > init](/docs/cli.html)):

```bash
npx sigma-ui init
```

And follow the steps in your terminal.

### Add components

You can now start adding components to your project (learn more in: [CLI docs > add](/docs/cli.html)):

```bash
npx sigma-ui add button
```

Then, you can use the added component without importing it:

```vue {2,6}
<template>
  <Button>Click me</Button>
</template>
```

If you define a prefix in the config, you will need to use the prefix:

```vue {2,6}
<template>
  <UiButton>Click me</UiButton>
</template>
```

</Steps>
