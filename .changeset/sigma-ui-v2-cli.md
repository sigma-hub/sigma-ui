---
"sigma-ui": major
---

SIGMA-UI 2.0: the CLI reads components from the hosted registry at https://sigma-ui.dev/r, supports Tailwind v4 and Nuxt 4, and adds the `view`, `search`, `build`, and `mcp` commands.

- Registry-driven CLI: components are fetched from `https://sigma-ui.dev/r/{style}/{name}.json`.
- Tailwind CSS v4 only (`@theme`, `@tailwindcss/vite`, `tw-animate-css`). Tailwind 3 and `tailwindcss-animate` are not supported for new installs.
- `migrate` upgrades 1.x projects: config shape, kebab-case component directories, imports, and theme CSS (HSL triplets, missing `accent` / `sidebar-*` tokens).
- `diff` is deprecated. It prints a warning and runs `add --diff`.
- New commands: `view`, `search`, `build`, `mcp`.
- `init` always registers `@tailwindcss/vite` for Tailwind projects, even when `tailwindcss` is already installed, and installs `@types/node` on Vite so `vue-tsc` accepts `node:url` in the generated alias.
- `add` rejects registry `file.target` paths that escape the project (`..` or absolute paths), and refuses to install into an unmigrated 1.x directory layout or stylesheet.
