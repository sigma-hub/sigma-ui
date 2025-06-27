---
title: CLI
description: Use the CLI to add components to your project.
---

> NOTE:
> The `npx` command comes with NPM, you can use it out of the box.

## `init`

Use the `init` command without specifying the version to initialize the latest version of SIGMA-UI in a project.

```bash
npx sigma-ui init
```

or specify the version you want to use (it uses the latest version by default):

```bash
npx sigma-ui@latest init
```

When you run this command, you will be asked a few questions to configure `sigma-ui.config.json`. After that, it will install dependencies, create css, utils and config files (like `sigma-ui.config.json` and `tailwind.config.js` if needed), write CSS variables, and prepare your project for adding sigma-ui components.

### Options

```txt
Usage: npx sigma-ui[@latest] init [options]

initialize your project and install dependencies

Options:
  -y, --yes        skip confirmation prompt. (default: false)
  -c, --cwd <cwd>  the working directory. (default: the current directory)
  -h, --help       display help for command
```

## `add`

Use the `add` command to add components and dependencies to your project.

Use the command without arguments to display the list of all components you can add:

```bash
npx sigma-ui add
```

You will be presented with a list of components to choose from:

```txt
Which components would you like to add? › [Space] to select. [Return] to submit.

◯  accordion
◯  alert
◯  alert-dialog
◯  avatar
◯  badge
◯  button
◯  card
◯  checkbox
◯  collapsible
```

Use the command with specific component names to add them to your project without showing the list, for example:

```bash
npx sigma-ui add button accordion select
```

Use the command with specific version:

```bash
npx sigma-ui@latest add
```

### Options

```txt
Usage: npx sigma-ui[@latest] add [options] [components...]

add components to your project

Arguments:
  components         name of components

Options:
  --nodep            disable adding & installing dependencies (advanced) (default: false)
  -y, --yes          Skip confirmation prompt. (default: false)
  -o, --overwrite    overwrite existing files. (default: false)
  -c, --cwd <cwd>    the working directory. (default: the current directory)
  -p, --path <path>  the path to add the component to.
  -h, --help         display help for command
```

## `update`

Use the `update` command to update components in your project. This will overwrite any modifications you've made to the components, so be sure to commit your changes before running this command.

```txt
Usage: npx sigma-ui[@latest] update [options] [components...]

update components in your project

Arguments:
  components       name of components

Options:
  -c, --cwd <cwd>  the working directory. (default: the current directory)
  -h, --help       display help for command
```

## `diff`

Use the `diff` command to compare the current version of sigma-ui components with the changes in your project, for example:

```bash
npx sigma-ui diff button
```

This will show you the changes for the `button` component in your project that differ from the latest version of the sigma-ui `button` component.
