<h1>
  <img valign="middle" src="./apps/docs/src/public/sigma-ui-logo-color.png" width="64px">
  &nbsp;&nbsp;SIGMA-UI
</h1>

**SIGMA-UI** - is a collection of fully customizable well-built components and blocks for Vue, using recently invented distribution method via `npx` that I call GOAT (Git Obtained As Template).

It takes away the burden of recreating the same components from scratch for every new project, giving you components that you can quickly add and modify to your design system.

![preview](apps/docs/src/public/og.png)

## About

**Website**: https://sigma-ui.dev
<br/>**NPM**: https://www.npmjs.com/package/sigma-ui

- **Supported frameworks**: Vue, Nuxt, Laravel, Astro.
- **Supported languages**: TS (all components are typed, JS projects are not supported).
- **Supported vue versions**: 3 and above.
- **Supported style systems**: CSS, Tailwind 4.
- **Is open-source**: Yes, MIT licensed.
- **Accessibility**: Supported.
- **Based upon**: Radix Vue primitives.
- **Installation method**: GOAT (Git Obtained As Template) via npx commands. Unlike NPM modules, these components are copied from git repository directly into your project's components directory and give you full control over customization, instead of using just props and css overrides.
- **Main problem it solves**: You are a developer, you create a new project, it needs 20+ components like dialogs, selects, skeletons, etc, and they all need to follow your companies' / your own design system:
  - **What sad devs do:** spend a year creating every component from scratch for every new project they work on, end up with a broken buggy mess of components without any basic keyboard navigation support, modals that you cannot close with Esc, and no accessibility at all.
  - **What Beta devs do:** use a conventional library (e.g Vuetify, Quasar) and monkey patch components' css with `!important`, trying to make their components follow their design system, and failing to modify baked-in Material design and animations.
  - **What Sigma devs do:** add these GOAT components directly to your main (or uikit) project "components" dir, spend a little time modifying their design and functionality as needed. Profit.

## Community links
[Discord](https://discord.gg/jH2X4VGBA4) | [YouTube](https://www.youtube.com/@sigma-dev) | [X (Twitter)](https://twitter.com/sigma__dev) | [Telegram](https://t.me/sigma_devs)
<br>Thanks to everyone who has been sharing this project with others!


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
 
- [Shadcn](https://github.com/shadcn): open-source developer that showcased the first implmentation of the GOAT distribution method and beautiful components for it. 
- [Zernonia](https://github.com/zernonia): open-source developer that created Reka-ui primitives which are used as the basis for this project.

## License

Licensed under the [MIT license](https://github.com/sigma-hub/sigma-ui/blob/main/LICENSE).
