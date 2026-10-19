---
title: Upgrade to 2.0
description: Breaking changes and the migrate command for SIGMA-UI 1.x projects.
---

SIGMA-UI 2.0 is a new major version of the CLI and the component registry. Existing 1.x projects keep working until you upgrade. Run `migrate` before `add`, then compare your local files with the 2.0 registry.

## Breaking changes

- **Tailwind CSS v4 only.** New and migrated Tailwind projects use `@import "tailwindcss"`, `@theme`, and `@tailwindcss/vite`. Tailwind 3 JavaScript config files can stay as `@config`, but new utilities such as `bg-accent` and `sidebar-*` need theme tokens that 1.x never defined.
- **Theme CSS is no longer HSL triplets.** 1.x stored `--primary: 240 5.9% 10%` and used `hsl(var(--primary))` in Tailwind. 2.0 components use `var(--primary)` (and Tailwind maps `--color-primary` to that value). `migrate` wraps triplets as `hsl(...)` or adds an `@theme` `hsl(var(--token))` mapping, and fills in missing `accent` and `sidebar-*` tokens.
- **Animations use `tw-animate-css`.** Replace `tailwindcss-animate`. `migrate` adds the import and can install the package.
- **Component directories are kebab-case.** `Button/` becomes `button/`. File names still follow `componentNaming` in `sigma-ui.config.json`.
- **Config shape.** `style` is `styleSystem`, `tailwind.css` is `cssPath`, `aliases.ui` is `aliases.components`.
- **`diff` is deprecated.** It still works, prints a warning, and runs `add --diff`. Use `npx sigma-ui add --diff` (or `npx sigma-ui add button --diff`) instead.

## `migrate`

From the project root:

```bash
npx sigma-ui migrate
```

```txt
Usage: npx sigma-ui migrate [options]

upgrade a sigma-ui 1.x project to 2.0: config, kebab-case directories, imports, and theme CSS

Options:
  -y, --yes        skip the confirmation prompt
  -c, --cwd <cwd>  the working directory
  --dry-run        show the planned changes without writing anything
```

The command:

1. Rewrites `sigma-ui.config.json` to the 2.0 schema.
2. Renames PascalCase component directories to kebab-case and updates imports.
3. Patches the theme stylesheet: HSL triplets, missing `accent` / `sidebar-*` tokens, Tailwind 4 `@import` / `@theme`, and `tw-animate-css`.
4. Registers `@tailwindcss/vite` when the project uses Tailwind.

Use `--dry-run` to print the plan. After it runs, compare components with the registry:

```bash
npx sigma-ui add --diff
```

## Adding components to a 1.x project

`sigma-ui add` refuses to install into an unmigrated 1.x layout. If it sees PascalCase component folders or a 1.x stylesheet, it tells you to run `migrate` first. That avoids creating lowercase folders next to the old PascalCase ones.

## New projects

```bash
npx sigma-ui init
npx sigma-ui add button
```

`init` writes a Tailwind v4 or CSS stylesheet, registers `@tailwindcss/vite` for Tailwind apps, and adds `@types/node` on Vite so `vue-tsc` can type `node:url` in the Vite config.

## CSS style system

CSS-style 2.0 components read colors as `var(--primary)`. If `migrate` finds HSL triplets, it wraps them as `hsl(240 5.9% 10%)`. There is no `utils` file unless you add Tailwind; blocks that used `valueUpdater` from `@/lib/utils` now define that helper locally.

`migrate` also adds `@layer base, components;` to the top of the stylesheet and imports `preflight.css` into the `base` layer. 2.0 component styles live in `@layer components`, so your unlayered CSS overrides them. Unset borders now use `var(--border)` from the theme instead of the text color. Global element rules in your own CSS (`code`, `h1`, `a`) now win over component styles too; move them into `@layer base` if a component looks off. If another stylesheet imports `preflight.css` without `layer(base)`, its resets beat the component styles (buttons lose their padding and borders); `migrate` lists those files. See [Overriding component styles](/docs/theming#overriding-component-styles).

## Nuxt

Install `sigma-ui-nuxt` and point `sigmaUi.componentDir` at `aliases.components`. See [Nuxt installation](/docs/installation/nuxt).
