# Changesets

Releases of the published packages (`sigma-ui` and `sigma-ui-nuxt`) are managed with [Changesets](https://changesets.dev). Private workspace packages (`docs`, `lib`, `@sigma-ui/shared`, the playground) are never versioned or published.

## Adding a changeset

Every pull request that changes the behavior of a published package should include a changeset:

```bash
pnpm changeset
```

Pick the affected packages and the bump type, then write a short user-facing summary. Commit the generated `.changeset/*.md` file together with the change. Changes that don't affect published packages (docs, CI, internal tooling) don't need one.

## Release flow

1. Changesets merged into `main` are collected by the `Release` workflow (`.github/workflows/release.yml`) into a "Dev: version packages" pull request. That pull request bumps the versions and writes `packages/*/CHANGELOG.md`.
2. Merging the version pull request runs the workflow again. It builds the CLI and the Nuxt module, publishes every package whose version isn't on npm yet with npm provenance, pushes the git tags, and creates GitHub releases.

`pnpm version-packages` runs the version step locally. The GitHub changelog generator needs a `GITHUB_TOKEN` environment variable with read access to the repository.

## Repository setup

- Add an `NPM_TOKEN` repository secret: a granular npm access token with read and write permission for the `sigma-ui` and `sigma-ui-nuxt` packages. It is the only secret the workflow needs, `GITHUB_TOKEN` is provided by GitHub Actions.
- Enable "Allow GitHub Actions to create and approve pull requests" in Settings > Actions > General, so the workflow can open the version pull request. Pull requests opened with `GITHUB_TOKEN` don't trigger the CI workflow, which is fine for the version pull request because it only touches versions and changelogs.
- `sigma-ui-nuxt` has to be published once before it can be switched to [npm trusted publishing](https://docs.npmjs.com/trusted-publishers). After both packages trust `.github/workflows/release.yml`, the `NPM_TOKEN` secret can be removed.
