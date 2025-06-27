<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: sigma-ui Nuxt
- Package name: sigma-ui-nuxt
- Description: My new Nuxt module
-->

# SIGMA-UI Nuxt

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

SIGMA-UI module for Nuxt.

- [📖 &nbsp;Documentation](https://sigma-ui.dev/docs/installation/nuxt.html)

## Features

- Auto-import components

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add sigma-ui-nuxt
```

That's it. You can now use SIGMA-UI components in your Nuxt app:

```vue
<template>
  <UiButton>Test</UiButton>
</template>
```

By default it uses the `Ui` prefix for all components, which you can change by setting the `prefix` option in the module configuration:

```ts
export default defineNuxtConfig({
  sigmaUi: {
    prefix: 'Ui',
  },
})
```



<!-- Badges -->
[npm-version-src]: https://img.shields.io/npm/v/sigma-ui-nuxt/latest.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-version-href]: https://npmjs.com/package/sigma-ui-nuxt

[npm-downloads-src]: https://img.shields.io/npm/dm/sigma-ui-nuxt.svg?style=flat&colorA=18181B&colorB=28CF8D
[npm-downloads-href]: https://npmjs.com/package/sigma-ui-nuxt

[license-src]: https://img.shields.io/npm/l/sigma-ui-nuxt.svg?style=flat&colorA=18181B&colorB=28CF8D
[license-href]: https://npmjs.com/package/sigma-ui-nuxt

[nuxt-src]: https://img.shields.io/badge/Nuxt-18181B?logo=nuxt.js
[nuxt-href]: https://nuxt.com
