# sigma-ui-nuxt

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Nuxt module for [SIGMA-UI](https://sigma-ui.dev). It auto-imports the components that the `sigma-ui` CLI adds to your project and wires Tailwind CSS v4.

- [Documentation](https://sigma-ui.dev/docs/installation/nuxt)
- [Changelog](https://github.com/sigma-hub/sigma-ui/blob/main/packages/nuxt-module/CHANGELOG.md)

## Features

- Auto-imports every component exported from `components/ui/<name>/index.ts`, with an optional prefix.
- Registers `@tailwindcss/vite` when it is installed, so Tailwind v4 works without extra config.
- Provides a fallback `@/lib/utils` (`cn()`) when the project does not have one.
- Restarts the dev server when `sigma-ui add` creates or removes a component.
- Supports Nuxt 3.21+ and Nuxt 4.

## Setup

Install the module:

```bash
npx nuxi module add sigma-ui-nuxt
```

For the Tailwind style system, install Tailwind v4, its Vite plugin, and the animation stylesheet:

```bash
npm install -D tailwindcss @tailwindcss/vite
npm install tw-animate-css
```

`sigma-ui init` writes a CSS-first stylesheet (`@import "tailwindcss"` and `@import "tw-animate-css"`). New projects do not use a `tailwind.config.js`.

Then initialize SIGMA-UI and add components:

```bash
npx sigma-ui init
npx sigma-ui add button
```

Add the CSS file that `sigma-ui init` writes (its path is `cssPath` in `sigma-ui.config.json`) to `css` in `nuxt.config.ts`.

Use the components without importing them:

```vue
<template>
  <Button>Click me</Button>
</template>
```

## Options

```ts
export default defineNuxtConfig({
  modules: ['sigma-ui-nuxt'],
  sigmaUi: {
    prefix: '',
    componentDir: '@/components/ui',
    tailwind: 'auto',
  },
});
```

| Option | Default | Description |
| --- | --- | --- |
| `prefix` | `''` | Prefix for every component name. With `'Ui'`, `Button` becomes `<UiButton>`. |
| `componentDir` | `'@/components/ui'` | Directory with the components. Accepts Nuxt aliases (`@/` and `~/` point at `srcDir`, which is `app/` in Nuxt 4) and paths relative to `rootDir`. Keep it in sync with `aliases.components` in `sigma-ui.config.json`. |
| `tailwind` | `'auto'` | `'auto'` registers `@tailwindcss/vite` when it is installed and not already in `vite.plugins`. `true` also warns when the package is missing. `false` never registers it. |

The legacy `@nuxtjs/tailwindcss` module targets Tailwind v3. When it is installed, the module does not register `@tailwindcss/vite` and logs a warning.

## Development

From the repository root:

```bash
pnpm install
pnpm --filter sigma-ui build
pnpm --filter sigma-ui-nuxt dev:prepare
pnpm --filter sigma-ui-nuxt dev:components
pnpm --filter sigma-ui-nuxt dev
```

`dev:components` runs `sigma-ui add` in the playground, so its components always come from the current registry. They are git-ignored.

```bash
pnpm --filter sigma-ui-nuxt test
pnpm --filter sigma-ui-nuxt ts
pnpm --filter sigma-ui-nuxt build
```

The tests build and server-render the fixtures in `test/fixtures` with `@nuxt/test-utils`.

<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/sigma-ui-nuxt/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/sigma-ui-nuxt

[npm-downloads-src]: https://img.shields.io/npm/dm/sigma-ui-nuxt.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/sigma-ui-nuxt

[license-src]: https://img.shields.io/npm/l/sigma-ui-nuxt.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/sigma-ui-nuxt

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
