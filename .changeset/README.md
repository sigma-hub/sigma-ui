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

`pnpm version-packages` runs the version step locally. It runs `changeset version`, then `scripts/changelog/run.mjs`, which puts every `packages/*/CHANGELOG.md` into the release notes layout. The GitHub releases are cut from those changelog sections, so they have the same layout.

## Release notes layout

The changelog is written by our own generator (`.changeset/changelog.mjs`, code in `scripts/changelog`) instead of `@changesets/changelog-github`:

- Each change is a plain bullet. There is no pull request link, commit hash or "Thanks" line.
- Sections are named by what they hold: Breaking changes (major), New features (minor), Improvements and fixes (patch).
- People listed under `maintainers` in `.changeset/config.json` are never credited. Changes by anyone else get "by @handle in <pull request>" and move to an "Other contributions" section at the bottom.
- The author of a change is found from the commit that added the changeset, through the GitHub API, so `GITHUB_TOKEN` should be set (the release workflow sets it). When the author can't be found, nobody is credited.

Write changeset summaries as the text you want users to read: plain sentences, and a nested list for details.

`pnpm test:changelog` tests the generator and the formatter. CI also runs `node scripts/changelog/run.mjs --check` to make sure the committed changelogs are in the layout.

## Repository setup

- The workflow needs no secrets. It publishes to npm with trusted publishing (see [Releasing](#releasing)), and `GITHUB_TOKEN` is provided by GitHub Actions.
- Enable "Allow GitHub Actions to create and approve pull requests" in Settings > Actions > General, so the workflow can open the version pull request. Pull requests opened with `GITHUB_TOKEN` don't trigger the CI workflow, which is fine for the version pull request because it only touches versions and changelogs.

## Releasing

The `Release` workflow publishes with [npm trusted publishing](https://docs.npmjs.com/trusted-publishers) (OIDC) instead of an npm token. The job has the `id-token: write` permission, and npm exchanges a short-lived GitHub identity token for a publish token for each package. npm adds provenance automatically.

Trusted publishing needs npm 11.5.1 or later and Node.js 22.14.0 or later. Node.js 22 ships npm 10, so the workflow installs npm 11 into the Node.js install before publishing. `changeset publish` runs `pnpm publish`, and pnpm 10 hands the packed tarball to the npm that sits next to the `node` binary, not just the first `npm` on `PATH`. `scripts/check-trusted-publishing.mjs` asks pnpm which npm it runs and fails the job early if it is too old.

### Set up trusted publishing for a package

Do this once for each published package (`sigma-ui` and `sigma-ui-nuxt`). On npmjs.com, open the package > Settings > Trusted publishing, choose GitHub Actions, and fill in:

| Field | Value |
| --- | --- |
| Organization or user | `sigma-hub` |
| Repository | `sigma-ui` |
| Workflow filename | `release.yml` |
| Environment name | leave empty, the workflow doesn't use a GitHub environment |
| Allowed actions | allow `npm publish`. New configurations only allow `npm stage publish` by default, and the workflow publishes directly. |

The same thing from the command line, with npm 11 and a maintainer account:

```bash
npm trust github <package> --file release.yml --repository sigma-hub/sigma-ui --allow-publish
```

- A new configuration expires if no publish uses it within 2 days, so set it up shortly before merging the version pull request.
- `repository.url` in the package's `package.json` must match the GitHub repository (`git+https://github.com/sigma-hub/sigma-ui.git`, with `directory` pointing at the package folder).
- Once a release has gone out this way, set Settings > Publishing access to "Require two-factor authentication and disallow tokens", and revoke npm tokens you no longer need.

### Add a brand-new package

Trusted publishing can only be set up for a package that already exists on npm. For a new package:

1. From your own machine, publish a placeholder `0.0.0`: a folder with only a `package.json` that has the package `name`, `"version": "0.0.0"`, a description saying it's a placeholder, `"license": "MIT"`, and `repository` (`url` as above, `directory` set to the package folder). Then run `npm login` and `npm publish --access public`.
2. Set up trusted publishing for it as described above.
3. Release the real first version (for example `1.0.0`) through changesets as usual. `changeset publish` publishes every version that isn't on npm yet, with the `latest` tag, so the placeholder doesn't get in the way.
4. After the real version is out, deprecate the placeholder: `npm deprecate <package>@0.0.0 "Placeholder, use 1.0.0 or later"`.
