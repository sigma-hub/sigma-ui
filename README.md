<h1>
  <img valign="middle" src="./apps/docs/src/public/sigma-ui-logo-color.png" width="64px">
  &nbsp;&nbsp;SIGMA-UI
</h1>

**SIGMA-UI** is a Vue and Nuxt component collection. Copy the components into your project and edit the source.

- **Plain CSS beside Tailwind v4.** The same components ship in two style systems, `css` and `tailwind`. Tailwind projects use Tailwind v4.
- **Generated API docs.** Props, emits, and slots on the docs site are generated from the component source. The CSS and Tailwind APIs are checked so they stay the same.
- **Reka-native.** Interactive components are built on [Reka UI](https://reka-ui.com) primitives.
- **Vue and Nuxt first.** The components are Vue 3 and TypeScript. The [sigma-ui-nuxt](https://www.npmjs.com/package/sigma-ui-nuxt) module auto-imports the components the CLI adds. Vite, Astro, and Laravel are supported as well.

You install them with a CLI: copy-paste components, shadcn registry-item compatible, served from [`/r/{style}/{name}.json`](https://sigma-ui.dev/r/tailwind/button.json).

![preview](apps/docs/src/public/og.png)

## About

**Website**: https://sigma-ui.dev
<br/>**NPM**: https://www.npmjs.com/package/sigma-ui

## Community links
[Discord](https://discord.gg/jH2X4VGBA4) | [YouTube](https://www.youtube.com/@sigma-dev) | [X (Twitter)](https://twitter.com/sigma__dev) | [Telegram](https://t.me/sigma_devs)
<br>Thanks to everyone who has been sharing this project with others!

## Usage

`init` writes `sigma-ui.config.json` and asks which style system to use:

```bash
npx sigma-ui init
```

`add` fetches the registry item and the items it depends on, installs their npm dependencies, and writes the files into your project:

```bash
npx sigma-ui add button
```

Run `npx sigma-ui add` with no names to pick components and blocks from a list. On Nuxt, add the module first:

```bash
npx nuxi module add sigma-ui-nuxt
```

Install guides: [Vite](https://sigma-ui.dev/docs/installation/vite), [Nuxt](https://sigma-ui.dev/docs/installation/nuxt), [Astro](https://sigma-ui.dev/docs/installation/astro), [Laravel](https://sigma-ui.dev/docs/installation/laravel).

| Command | What it does |
| --- | --- |
| `npx sigma-ui search` | List or filter registry items. |
| `npx sigma-ui view button` | Print a registry item as JSON. |
| `npx sigma-ui add button --diff` | Show how your copy differs from the registry. |
| `npx sigma-ui add button --dry-run` | Show the files and packages that would be installed. |
| `npx sigma-ui info` | Print the resolved project config. |
| `npx sigma-ui migrate` | Upgrade a 1.x project to 2.0. |
| `npx sigma-ui build` | Build a custom registry into static JSON. |
| `npx sigma-ui mcp` | Serve the registry to an editor over MCP. |

## Registry

Each public item is a [shadcn registry item](https://ui.shadcn.com/schema/registry-item.json):

```text
https://sigma-ui.dev/r/{style}/{name}.json
```

`{style}` is `tailwind` or `css`. The Tailwind button is [https://sigma-ui.dev/r/tailwind/button.json](https://sigma-ui.dev/r/tailwind/button.json). The plain-CSS button is [https://sigma-ui.dev/r/css/button.json](https://sigma-ui.dev/r/css/button.json). The index for a style is `https://sigma-ui.dev/r/{style}/registry.json`.

`sigma-ui add` also accepts an item URL, a path to a local JSON file, or `@namespace/name` when `registries` in `sigma-ui.config.json` points at another registry. A configured registry URL can use the same `{style}` and `{name}` placeholders.

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

## Supporters

Consider supporting the project:

- [Patreon](https://patreon.com/sigma_ui) - monthly, with rewards
- [Donation Alerts](https://donationalerts.com/r/sigma_dev) - one-time donations

### Current supporters

<table>
  <tbody>
    <tr>
      <td align="center" valign="middle">
        <a href="https://cyberpunk-card.vercel.app" title="Masih Abjadi">
          <img valign="middle" width="48px" src="https://avatars.githubusercontent.com/u/4639192?v=4">
          Masih Abjadi
        </a>
        <br/>Fullstack dev • Looking for job
      </td>
    </tr>
  </tbody>
</table>

## Credits

Created, designed, and maintained by [Aleksey Hoffman](https://github.com/aleksey-hoffman).

Special thanks to all the open-source projects and developers who have inspired and contributed to the foundation that led to the creation of this project:

- [shadcn](https://github.com/shadcn): the registry-item schema and the copy-paste distribution this CLI follows.
- [Zernonia](https://github.com/zernonia): Reka UI primitives, which this project is built on.

## License

Licensed under the [MIT license](https://github.com/sigma-hub/sigma-ui/blob/main/LICENSE). Notices for the MIT-licensed projects SIGMA-UI derives from are in [THIRD_PARTY_NOTICES.md](https://github.com/sigma-hub/sigma-ui/blob/main/THIRD_PARTY_NOTICES.md).
