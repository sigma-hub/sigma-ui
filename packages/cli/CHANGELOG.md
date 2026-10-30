# sigma-ui

## 2.1.0

npm keeps 2.0.0 and 2.0.1 reserved for earlier versions that were unpublished, so the first release of v2 is 2.1.0.

### Breaking changes

- Require Node.js 22 or newer. Components now install `@vueuse/core` 15, which dropped Node.js 20.

- SIGMA-UI 2.0: the CLI reads components from the hosted registry at https://sigma-ui.dev/r, supports Tailwind v4 and Nuxt 4, and adds the `view`, `search`, `build`, and `mcp` commands.

  - Registry-driven CLI: components are fetched from `https://sigma-ui.dev/r/{style}/{name}.json`.
  - Tailwind CSS v4 only (`@theme`, `@tailwindcss/vite`, `tw-animate-css`). Tailwind 3 and `tailwindcss-animate` are not supported for new installs.
  - `migrate` upgrades 1.x projects: config shape, kebab-case component directories, imports, and theme CSS (HSL triplets, missing `accent` / `sidebar-*` tokens).
  - `diff` is deprecated. It prints a warning and runs `add --diff`.
  - New commands: `view`, `search`, `build`, `mcp`.
  - `init` always registers `@tailwindcss/vite` for Tailwind projects, even when `tailwindcss` is already installed, and installs `@types/node` on Vite so `vue-tsc` accepts `node:url` in the generated alias.
  - `add` rejects registry `file.target` paths that escape the project (`..` or absolute paths), and refuses to install into an unmigrated 1.x directory layout or stylesheet.

### Improvements and fixes

- `add` now warns when a dependency is installed at a major version the registry items do not support, such as zod 3 for the zod 4 forms, and offers to upgrade it instead of silently keeping it. `--yes` and non-interactive runs keep the installed version and print the upgrade command. The form component now ships `toTypedSchema` for any Standard Schema library (zod 4, valibot, arktype), so `@vee-validate/zod` is no longer needed.
- The data table block (`table-simple`) and the data table examples now install `@tanstack/vue-table` 9. They use `useTable` with a `features.ts` file that registers the table features, row models, and filter and sort functions they use. Sorting, filtering, pagination, row selection, column visibility, and pinning behave as before. Column pinning now uses `start` and `end` instead of `left` and `right`.
