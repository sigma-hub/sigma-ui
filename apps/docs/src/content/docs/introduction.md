---
title: Introduction
---

## Quick start

Step 1: Initialize SIGMA-UI config in your project:

```
npx sigma-ui init
```

Step 2: Add <a href="/components/accordion.html">components</a> to your project:

```
npx sigma-ui add
```

Step 3: Use the added components, modify their code to your needs.

See [installation page](/docs/installation.html) for more details.

## About

**SIGMA-UI** - is a collection of fully customizable well-built components and blocks for Vue.

## Main problem it solves

It takes away the burden of recreating the same components (like dialogs, selects, skeletons, etc) from scratch for every new project yourself, giving you a good base to built from.

## Features

- **Supported frameworks**: Vue, Nuxt, Laravel, Astro.
- **Supported languages**: TS (all components are typed, JS projects are not supported).
- **Supported vue versions**: 3 and above.
- **Supported style systems**: CSS, Tailwind 4.
- **Is open-source**: Yes, MIT licensed.
- **Accessibility**: Supported.
- **Based upon**: Reka (formerly Radix-Vue) primitives.
- **Installation method**: Copy-paste components with the CLI, shadcn registry-item compatible, served from `/r/{style}/{name}.json`. `{style}` is `tailwind` or `css`. The CLI writes the files into your project.

## Comparison

A project needs accessible components that follow your design system. Three ways to get them:

- **Write each component.** You control the code, and you implement keyboard behavior, focus, and ARIA.
- **Use a conventional library** such as Vuetify or Quasar. You start faster. Matching a design system means props, slots, and CSS overrides, and the library's look stays in the components.
- **Copy these components in.** The CLI writes them into your project. You edit that source. Interactive behavior comes from Reka UI primitives.

| | Sigma UI | Components you write | Conventional UI library |
| --- | --- | --- | --- |
| Customization | Edit the source in your project | Edit the source you wrote | Props, slots, and CSS overrides |
| Time | Add a component, then change it | Build each component | Most of the time goes into overrides |
| Code | The files live in your repository | The files live in your repository | You depend on the published package |
| Design system | Change the components until they match | Write them to match | Overrides on top of the library's design |
| Maintenance | You maintain the copies. `sigma-ui add <name> --diff` shows drift | You maintain the code | The library maintainers ship updates |
| Accessibility | Reka UI primitives | You implement it | Usually included |

## Credits

Created, designed, and maintained by [Aleksey Hoffman](https://github.com/aleksey-hoffman).

Special thanks to all the open-source projects and developers who have inspired and contributed to the foundation that led to the creation of this project: 
 
- [shadcn](https://github.com/shadcn): the registry-item schema and the copy-paste distribution this CLI follows. 
- [Zernonia](https://github.com/zernonia): open-source developer that created Reka-ui primitives which are used as the basis for this project.

## License

[MIT © sigma-ui](https://github.com/sigma-hub/sigma-ui/blob/main/LICENSE)

## FAQ

<Faq />
