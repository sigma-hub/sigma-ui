# sigma-ui-nuxt

## 1.0.0

### Major Changes

- [#5](https://github.com/sigma-hub/sigma-ui/pull/5) [`a050f97`](https://github.com/sigma-hub/sigma-ui/commit/a050f9790d5df989ecc359fdcbb0028b81d12eaf) Thanks [@aleksey-hoffman](https://github.com/aleksey-hoffman)! - Require Node.js 22 or newer. Components now install `@vueuse/core` 15, which dropped Node.js 20.

- [#5](https://github.com/sigma-hub/sigma-ui/pull/5) [`87bb5ab`](https://github.com/sigma-hub/sigma-ui/commit/87bb5ab8d09e9cdb91f71e4fbcc62189b4156ce9) Thanks [@aleksey-hoffman](https://github.com/aleksey-hoffman)! - First release of the SIGMA-UI Nuxt module. It auto-imports every component added with the CLI (exports named in ALL_CAPS, such as constants, are not auto-imported), provides `@/lib/utils` when the project doesn't have one, and registers `@tailwindcss/vite` for Tailwind v4.
