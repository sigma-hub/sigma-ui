---
title: CLI
description: Use the CLI to add components to your project.
---

> NOTE:
> The `npx` command comes with NPM, you can use it out of the box.

The commands are `init`, `add`, `view`, `search`, `info`, `migrate`, `build`, `mcp`, and `diff`. There is no `update` command. To refresh a component, run `add` again.

## `init`

Initialize the latest version of SIGMA-UI in a project:

```bash
npx sigma-ui init
```

Pin a CLI version with `npx sigma-ui@latest init`. The latest version is the default.

The prompt asks for the style system (`tailwind` or `css`), a base color, and the component file naming. It then writes `sigma-ui.config.json` and the stylesheet for that style system. For Tailwind it also writes `cn` when `@/lib/utils` is missing, installs `tw-animate-css`, and always registers `@tailwindcss/vite` (the helper skips the file if the plugin is already there). It installs `tailwindcss` and `@tailwindcss/vite` when they are missing, even if one of them is already in `package.json`. Vite projects also get `@types/node` so `vue-tsc` accepts `node:url` in the generated `@` alias. New Tailwind projects do not get a `tailwind.config.js`. The CSS style system does not install Tailwind. It writes `preflight.css` next to the stylesheet and starts the stylesheet with `@layer base, components;`, so component styles sit below your own CSS. See [Overriding component styles](/docs/theming#overriding-component-styles).

### Options

```txt
Usage: npx sigma-ui init [options]

initialize your project and install dependencies

Options:
  -y, --yes        skip confirmation prompts and overwrite existing files. (default: false)
  -d, --defaults   use the default configuration without prompts. (default: false)
  -c, --cwd <cwd>  the working directory. (default: the current directory)
  -h, --help       display help for command
```

## `add`

Add components and blocks, plus the npm packages and registry items they depend on.

With no names, pick from the registry:

```bash
npx sigma-ui add
```

```txt
Which components would you like to add?
Type to filter, [Space] to select, [Enter] to submit.
```

Blocks are marked `(block)` in that list.

Pass names to skip the list:

```bash
npx sigma-ui add button accordion select
```

A name can also be `@namespace/name`, an item URL, or a path to a registry item JSON file:

```bash
npx sigma-ui add https://sigma-ui.dev/r/tailwind/button.json
```

The CLI fetches `https://sigma-ui.dev/r/{style}/{name}.json` for the style system in `sigma-ui.config.json`. `{style}` is `tailwind` or `css`.

Existing files that differ from the registry are left in place unless you confirm the overwrite or pass `--overwrite`.

### Options

```txt
Usage: npx sigma-ui add [options] [components...]

add components and blocks to your project

Arguments:
  components         names, @namespace/names, URLs, or paths to registry item JSON files

Options:
  -y, --yes          skip confirmation prompts. (default: false)
  -o, --overwrite    overwrite existing files. (default: false)
  -c, --cwd <cwd>    the working directory. (default: the current directory)
  -a, --all          add all available UI components. (default: false)
  -p, --path <path>  the directory to add the files to.
  --dry-run          show what would be written and installed without changing anything. (default: false)
  --diff             show the differences between local files and the registry without changing anything. (default: false)
  -h, --help         display help for command
```

`--all` adds items of type `registry:ui`. It does not add blocks.

## `view`

Print registry items as JSON without installing them:

```bash
npx sigma-ui view button
```

### Options

```txt
Usage: npx sigma-ui view [options] <items...>

print registry items as JSON without installing them

Arguments:
  items            names, @namespace/names, URLs, or paths to registry item JSON files

Options:
  -c, --cwd <cwd>    the working directory. (default: the current directory)
  -s, --style <style>  the style system to view (tailwind or css). (default: the project config)
  -h, --help         display help for command
```

## `search`

Search or list items from the sigma-ui registry and configured namespaces. `list` is an alias.

```bash
npx sigma-ui search
npx sigma-ui search -q button -t ui
npx sigma-ui list @acme
```

### Options

```txt
Usage: npx sigma-ui search [options] [registries...]

search or list items from the sigma-ui registry and configured namespaces

Arguments:
  registries         registry namespaces to search, e.g. @acme. (default: the sigma-ui registry)

Options:
  -q, --query <query>  only show items whose name, title, description, or categories match
  -t, --type <type>    only show items of this type, e.g. ui or block
  -c, --cwd <cwd>      the working directory. (default: the current directory)
  -s, --style <style>  the style system to search (tailwind or css). (default: the project config)
  --json               print the results as JSON. (default: false)
  -h, --help           display help for command
```

## `info`

Print the sigma-ui configuration for this project:

```bash
npx sigma-ui info
```

### Options

```txt
Usage: npx sigma-ui info [options]

print the sigma-ui configuration for this project

Options:
  -c, --cwd <cwd>  the working directory. (default: the current directory)
  --json           print the information as JSON. (default: false)
  -h, --help       display help for command
```

## `migrate`

Upgrade a sigma-ui 1.x project to 2.0. This rewrites the config shape, renames component directories to kebab-case, and updates imports.

```bash
npx sigma-ui migrate
```

### Options

```txt
Usage: npx sigma-ui migrate [options]

upgrade a sigma-ui 1.x project to 2.0: config shape, kebab-case component directories, and imports

Options:
  -y, --yes        skip the confirmation prompt. (default: false)
  -c, --cwd <cwd>  the working directory. (default: the current directory)
  --dry-run        show the planned changes without writing anything. (default: false)
  -h, --help       display help for command
```

## `build`

Build a custom registry into static JSON files that `sigma-ui add` can install from:

```bash
npx sigma-ui build ./registry.json -o ./public/r
```

### Options

```txt
Usage: npx sigma-ui build [options] [registry]

build a custom registry into static JSON files that "sigma-ui add" can install from

Arguments:
  registry           path to the registry.json file. (default: ./registry.json)

Options:
  -o, --output <path>  the output directory. (default: ./public/r)
  -c, --cwd <cwd>      the working directory. (default: the current directory)
  -h, --help           display help for command
```

## `mcp`

Start the registry MCP server on stdio, or add it to an MCP client's config. See [MCP Server](/docs/mcp) for client setup, tools, and example prompts.

```bash
npx sigma-ui mcp init --client cursor
npx sigma-ui mcp
```

### Options

```txt
Usage: npx sigma-ui mcp [options] [command]

start the registry MCP server on stdio

Options:
  -c, --cwd <cwd>  the working directory. (default: the current directory)
  -h, --help       display help for command

Commands:
  init [options]   add the sigma-ui MCP server to an MCP client's project config
```

```txt
Usage: npx sigma-ui mcp init [options]

add the sigma-ui MCP server to an MCP client's project config

Options:
  --client <client>  the MCP client (claude, cursor, vscode, codex, opencode, gemini)
  -c, --cwd <cwd>    the working directory. (default: the current directory)
  -h, --help         display help for command
```

## `diff`

`diff` is deprecated. It prints a warning and runs `add --diff`.

```bash
npx sigma-ui add button --diff
```

```txt
Usage: npx sigma-ui diff [options] [component]

deprecated: use "add --diff" instead

Arguments:
  component        the component name

Options:
  -c, --cwd <cwd>  the working directory. (default: the current directory)
  -h, --help       display help for command
```
