# sigma-ui-nuxt

## 1.0.0

### Breaking changes

- Require Node.js 22 or newer. Components now install `@vueuse/core` 15, which dropped Node.js 20.
- First release of the SIGMA-UI Nuxt module. It auto-imports every component added with the CLI (exports named in ALL_CAPS, such as constants, are not auto-imported), provides `@/lib/utils` when the project doesn't have one, and registers `@tailwindcss/vite` for Tailwind v4.
