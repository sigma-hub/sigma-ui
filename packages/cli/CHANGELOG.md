# sigma-ui

## 2.0.0

### Major Changes

- [#5](https://github.com/sigma-hub/sigma-ui/pull/5) [`a050f97`](https://github.com/sigma-hub/sigma-ui/commit/a050f9790d5df989ecc359fdcbb0028b81d12eaf) Thanks [@aleksey-hoffman](https://github.com/aleksey-hoffman)! - Require Node.js 22 or newer. Components now install `@vueuse/core` 15, which dropped Node.js 20.

- [#5](https://github.com/sigma-hub/sigma-ui/pull/5) [`87bb5ab`](https://github.com/sigma-hub/sigma-ui/commit/87bb5ab8d09e9cdb91f71e4fbcc62189b4156ce9) Thanks [@aleksey-hoffman](https://github.com/aleksey-hoffman)! - SIGMA-UI 2.0: the CLI reads components from the hosted registry at https://sigma-ui.dev/r, supports Tailwind v4 and Nuxt 4, and adds the `view`, `search`, `build`, and `mcp` commands.
  
  - Registry-driven CLI: components are fetched from `https://sigma-ui.dev/r/{style}/{name}.json`.
  - Tailwind CSS v4 only (`@theme`, `@tailwindcss/vite`, `tw-animate-css`). Tailwind 3 and `tailwindcss-animate` are not supported for new installs.
  - `migrate` upgrades 1.x projects: config shape, kebab-case component directories, imports, and theme CSS (HSL triplets, missing `accent` / `sidebar-*` tokens).
  - `diff` is deprecated. It prints a warning and runs `add --diff`.
  - New commands: `view`, `search`, `build`, `mcp`.
  - `init` always registers `@tailwindcss/vite` for Tailwind projects, even when `tailwindcss` is already installed, and installs `@types/node` on Vite so `vue-tsc` accepts `node:url` in the generated alias.
  - `add` rejects registry `file.target` paths that escape the project (`..` or absolute paths), and refuses to install into an unmigrated 1.x directory layout or stylesheet.

### Patch Changes

- [#5](https://github.com/sigma-hub/sigma-ui/pull/5) [`ab38d74`](https://github.com/sigma-hub/sigma-ui/commit/ab38d74286e52ad9999551b8667cb4aacc2059f4) Thanks [@aleksey-hoffman](https://github.com/aleksey-hoffman)! - `add` now warns when a dependency is installed at a major version the registry items do not support, such as zod 3 for the zod 4 forms, and offers to upgrade it instead of silently keeping it. `--yes` and non-interactive runs keep the installed version and print the upgrade command. The form component now ships `toTypedSchema` for any Standard Schema library (zod 4, valibot, arktype), so `@vee-validate/zod` is no longer needed.

- [#5](https://github.com/sigma-hub/sigma-ui/pull/5) [`3167794`](https://github.com/sigma-hub/sigma-ui/commit/3167794970b52ffc8a8b9dfb8fd8d59835ec17c4) Thanks [@aleksey-hoffman](https://github.com/aleksey-hoffman)! - The data table block (`table-simple`) and the data table examples now install `@tanstack/vue-table` 9. They use `useTable` with a `features.ts` file that registers the table features, row models, and filter and sort functions they use. Sorting, filtering, pagination, row selection, column visibility, and pinning behave as before. Column pinning now uses `start` and `end` instead of `left` and `right`.
