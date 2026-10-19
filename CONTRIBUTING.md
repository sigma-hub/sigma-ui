# Contributing

Thanks for helping improve sigma-ui. This guide covers the local setup, how the repository is organized, and what a complete change looks like.

If you want to propose a new component or a bigger change, open a [discussion](https://github.com/sigma-hub/sigma-ui/discussions) first, so we can agree on the API before you write code.

## Setup

You need Node.js 22.22 or newer and pnpm. The repository pins the pnpm version in `package.json`, so `corepack enable` picks the right one.

```bash
git clone https://github.com/sigma-hub/sigma-ui.git
cd sigma-ui
pnpm install
pnpm dev
```

`pnpm dev` starts the docs site at `http://localhost:5173`. Component sources are loaded directly from `packages/lib`, so edits show up immediately.

## Repository layout

| Path | What lives there |
| --- | --- |
| `packages/lib/src/registry/tailwind` | Tailwind components (`ui/`), docs examples (`example/`), and blocks (`blocks/`). |
| `packages/lib/src/registry/css` | The same components, examples, and blocks written with plain CSS. |
| `packages/cli` | The `sigma-ui` CLI. |
| `packages/nuxt-module` | The Nuxt module. |
| `apps/docs` | The VitePress docs site at [sigma-ui.dev](https://sigma-ui.dev). |
| `apps/docs/src/content/components` | One markdown page per component. |
| `apps/docs/src/content/meta` | The generated API reference. Do not edit it by hand. |

## Adding a component

1. Scaffold it:

   ```bash
   pnpm new:component input-group
   ```

   This creates the component in both style systems, a preview example for each, and a docs page that follows the page template.

2. Implement the component in **both** `tailwind/ui/<name>` and `css/ui/<name>`. The two versions must expose the same props, emits, slots, and exposed methods. Only the styling differs: Tailwind classes merged with `cn()` in one, `sigma-ui-<name>` BEM classes and a `<style>` block in the other.

3. Add JSDoc to every prop, emit, and slot that the component defines itself. Props inherited from Reka UI already have descriptions. The JSDoc becomes the description column of the generated API reference:

   ```ts
   interface Props extends PrimitiveProps {
     /** Shows a spinner and disables the button. */
     isLoading?: boolean;
   }

   const emits = defineEmits<{
     /** Emitted after the confirmation timeout ends. */
     confirmed: [];
   }>();

   defineSlots<{
     /** Content shown next to the icon. */
     default?: () => unknown;
   }>();
   ```

4. Add examples to `<style>/example/`. Name the main example after the component (`InputGroup.vue`) and the others `<Component><Variant>.vue` (`InputGroupWithButton.vue`). Each example must exist in both style systems.

5. Fill in the docs page, then regenerate and check everything:

   ```bash
   pnpm docs:gen        # regenerate the API reference and check CSS/Tailwind parity
   pnpm docs:lint       # check the structure of every component page
   pnpm build:registry  # regenerate the CLI registry
   ```

## The component page template

Every page in `apps/docs/src/content/components` has the same frontmatter and the same H2 sections, in this order. `pnpm docs:lint` enforces it.

```md
---
title: Input Group
description: One sentence that says what the component is for.
source: input-group          # folder name in packages/lib/src/registry/<style>/ui
primitive: https://reka-ui.com/docs/components/...   # optional
label: New                   # optional sidebar badge
---

## Preview
<ComponentPreview name="InputGroup" />

## Installation
<ComponentInstall name="input-group" />

## Usage
A minimal code sample with the imports.

## Examples
### One H3 per example
<ComponentPreview name="InputGroupWithButton" />

## API Reference
<!-- @include: @/content/meta/input-group.md -->

## Accessibility
The WAI-ARIA pattern it follows, then a keyboard table:

| Key | Description |
| --- | --- |
| <kbd>Tab</kbd> | Moves focus to the input. |
```

- Put anything else, such as setup steps or notes, under an H3 inside one of these sections.
- `<ComponentInstall>` renders the CLI command and the manual installation steps. The file list and the dependencies are read from the registry at build time.
- `<ComponentPreview>` renders the example and its code. The code is highlighted at build time for both style systems.
- The sidebar is built from the page frontmatter, so a new page shows up without any config change.

## Checks

Run these before you open a pull request:

| Command | What it checks |
| --- | --- |
| `pnpm lint` | ESLint over the whole repository. |
| `pnpm ts` | Type checks the docs, the CLI, and the Nuxt module. |
| `pnpm docs:check` | The generated API reference is up to date, and the CSS and Tailwind APIs match. |
| `pnpm docs:lint` | Every component page follows the template. |
| `pnpm build` | Builds the docs site. |
| `pnpm test` | Runs the CLI tests. |

## Commits and pull requests

- Write one change per commit, with a `Scope: description` subject. Scopes are `CLI`, `Docs`, `Lib`, `Blocks`, `Styles`, `Dev`, `CI`, `Nuxt`, and `UI`, joined with `/` when a commit spans several (`CLI/Docs: ...`). For example: `Lib: add the inset prop to DropdownMenuSubTrigger`.
- `pnpm install` sets up git hooks that check the subject with commitlint and run `eslint --fix` on the staged files.
- Changes to the published packages (`sigma-ui` and `sigma-ui-nuxt`) need a changeset. Run `pnpm changeset` and commit the generated file. See [.changeset/README.md](.changeset/README.md) for the release flow.
- Keep the two style systems in sync in the same pull request.
- Include screenshots in the pull request when you change something visual.
