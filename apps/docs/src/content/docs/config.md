---
title: sigma-ui.config.json
description: Configuration for your project.
---

The `sigma-ui.config.json` config file is created during [initialization](/docs/cli.html). It holds `SIGMA-UI` configuration for your project.

<Callout class="mt-6">

  Note: The config file is optional and **only required if you're using the CLI** to add components to your project. If you're using the copy
  and paste method, you don't need this file.

</Callout>

You can create a `sigma-ui.config.json` file in your project by running the following command:

```bash
npx sigma-ui init
```

See the [CLI section](/docs/cli) for more information.

## $schema

You can see the JSON Schema for `sigma-ui.config.json` [here](https://sigma-ui.dev/schema.json).

```json title="sigma-ui.config.json"
{
  "$schema": "https://sigma-ui.dev/schema.json"
}
```

# Config options

## `typescript`

This project and the components are written in TypeScript. It's highly recommended to use Typescript version of the components for your project as well.

You can set `typescript` to `false` to opt-out of TypeScript.

```json {2} title="sigma-ui.config.json"
{
  "typescript": false
}
```

To configure import aliases in Javascript, you can add the following to your `jsconfig.json` file:

```json {4} title="jsconfig.json"
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

## `styleSystem`

This field determines the style system for the components (CSS or Tailwind).

<!-- eslint-skip -->
```json title="sigma-ui.config.json"
{
  "styleSystem": "tailwind" | "css"
}
```

<Callout class="mt-6">
  If you want to change this after initialization, you'll have to re-install the components.
</Callout>

Try changing the style system and see how it affects the component's code:

<StyleSwitcher class="w-full" />

Preview:

<ComponentPreview name="CardWithForm" />

## `tailwind`

Skip this section if you're not using Tailwind style system.

This field helps CLI understand how Tailwind CSS is set up in your project. See [installation page](/docs/installation) to learn how to set up Tailwind CSS.

### tailwind.config

Path to your `tailwind.config.js` file.

<!-- eslint-skip -->
```json title="sigma-ui.config.json"
{
  "tailwind": {
    "config": "tailwind.config.js" | "tailwind.config.ts"
  }
}
```

### tailwind.css

Path to the CSS file that imports Tailwind CSS into your project.

```json title="sigma-ui.config.json"
{
  "tailwind": {
    "css": "src/assets/index.css"
  }
}
```

### `tailwind.baseColor`

This is used to generate the default color palette for your components.

<!-- eslint-skip -->
```json title="sigma-ui.config.json"
{
  "tailwind": {
    "baseColor": "zinc" | "blue" | "red" | ...
  }
}
```

<Callout class="mt-6">
  If you want to change this after initialization, you'll have to re-install the components.
</Callout>

## `aliases`

The CLI uses these values and the `paths` config from your `tsconfig.json` or `jsconfig.json` file to place generated components in the correct location.

Path aliases have to be set up in your `tsconfig.json` or `jsconfig.json` file. It will fallback to `tsconfig.app.json` if no `paths` were found in `tsconfig.json`

<Callout class="mt-6">

 **Important:** If you're using the `src` directory, make sure it is included
  under `paths` in your `tsconfig.json` or `jsconfig.json` file.

</Callout>

### aliases.utils

Import alias for your utility functions.

```json title="sigma-ui.config.json"
{
  "aliases": {
    "utils": "@ui/utils"
  }
}
```

### aliases.components

Path to where CLI will add components.

```json title="sigma-ui.config.json"
{
  "aliases": {
    "components": "@/components"
  }
}
```
