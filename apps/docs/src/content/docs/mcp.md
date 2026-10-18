---
title: MCP Server
description: Let AI coding assistants browse, search, and install SIGMA-UI components through the Model Context Protocol.
---

The `sigma-ui mcp` command starts a [Model Context Protocol](https://modelcontextprotocol.io) server. It gives an AI assistant in your editor read access to the SIGMA-UI registry and to every registry configured in your project, so you can ask for things like "add a login form" or "build a settings page with SIGMA-UI components".

The server only reads. It lists, searches, and shows registry items and returns the `npx sigma-ui add` command for them. The assistant runs that command like any other terminal command, so you see and approve every change.

## Quick start

Run `mcp init` in your project and pick your client:

```bash
npx sigma-ui@latest mcp init --client claude
```

`--client` takes `claude`, `cursor`, `vscode`, `codex`, `opencode`, or `gemini`. Leave it out to choose from a list. The command adds a `sigma-ui` server to the client's project config and keeps any servers that are already there. Then restart the client and try:

- Show me all blocks in the SIGMA-UI registry
- Add the button, dialog, and card components to my project
- Build a sign-up page using SIGMA-UI components and blocks

## Configuration

Every client starts the same command, `npx sigma-ui@latest mcp`, from the project root. If you prefer to edit the config by hand, here is what `mcp init` writes.

### Claude Code

`.mcp.json`:

```json
{
  "mcpServers": {
    "sigma-ui": {
      "command": "npx",
      "args": ["sigma-ui@latest", "mcp"]
    }
  }
}
```

Restart Claude Code and run `/mcp`. The `sigma-ui` server should show as connected.

### Cursor

`.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "sigma-ui": {
      "command": "npx",
      "args": ["sigma-ui@latest", "mcp"]
    }
  }
}
```

Enable the server in Cursor Settings → MCP. A green dot next to `sigma-ui` means it is running.

### VS Code

`.vscode/mcp.json` (GitHub Copilot agent mode):

```json
{
  "servers": {
    "sigma-ui": {
      "type": "stdio",
      "command": "npx",
      "args": ["sigma-ui@latest", "mcp"]
    }
  }
}
```

Open the file and click **Start** above the server. If your `mcp.json` has comments, `mcp init` leaves it unchanged and prints the snippet to paste instead.

### Codex

Codex reads MCP servers from your user config, so `mcp init --client codex` prints this instead of writing it. Add it to `~/.codex/config.toml` and restart Codex:

```toml
[mcp_servers.sigma-ui]
command = "npx"
args = ["sigma-ui@latest", "mcp"]
```

### OpenCode

`opencode.json`:

```json
{
  "$schema": "https://opencode.ai/config.json",
  "mcp": {
    "sigma-ui": {
      "type": "local",
      "command": ["npx", "sigma-ui@latest", "mcp"],
      "enabled": true
    }
  }
}
```

### Gemini CLI

`.gemini/settings.json`:

```json
{
  "mcpServers": {
    "sigma-ui": {
      "command": "npx",
      "args": ["sigma-ui@latest", "mcp"]
    }
  }
}
```

### Other clients

Any client that runs stdio MCP servers works. Use `npx` as the command and `sigma-ui@latest mcp` as the arguments, and start it from the project root. To use another folder, add `--cwd <path>`.

## Registries

The server always serves the SIGMA-UI registry, in the style system from your `sigma-ui.config.json` (`tailwind` without a config). It also serves every registry in the config's `registries` field:

```json
{
  "registries": {
    "@acme": "https://registry.acme.com/r/{name}.json",
    "@internal": {
      "url": "https://internal.example.com/r/{name}.json",
      "headers": {
        "Authorization": "Bearer ${REGISTRY_TOKEN}"
      }
    }
  }
}
```

`${NAME}` placeholders come from the environment. The server also reads `.env` and `.env.local` in the project, so a token in `.env.local` works without exporting it. Variables already set in the environment win.

## Tools

| Tool | What it does |
| --- | --- |
| `get_project_registries` | Lists the SIGMA-UI registry and the registries from `sigma-ui.config.json`, plus the project's style system. |
| `list_items_in_registries` | Lists items, optionally by registry and type (`ui`, `block`, `example`), with `limit` and `offset` paging. |
| `search_items_in_registries` | Searches item names, titles, descriptions, and categories. Every word of the query has to match. |
| `view_items_in_registries` | Returns full items: file contents, npm dependencies, and registry dependencies. |
| `get_item_examples_from_registries` | Finds usage examples, such as `button-demo` or `date-picker-with-range`, and returns their source. |
| `get_add_command_for_items` | Returns the `npx sigma-ui add` command for the items, quoted for the shell. |
| `get_audit_checklist` | Returns a checklist for reviewing the added code: imports, styles, dark mode, form autocomplete, accessibility, typecheck. |

Examples are registry items too. Each component's main example is named `<component>-demo`, and the others are named after their file in kebab case (`ButtonWithIcon.vue` is `button-with-icon`). `npx sigma-ui add button-demo` installs one into `src/components/example`.

## Example prompts

Browse and search:

- What components and blocks does SIGMA-UI have?
- Find a date picker with a range in the SIGMA-UI registry
- Show me how the data table example handles column pinning

Build:

- Add a login page with email and password using the `login-simple` block
- Create a settings form with a name field, an email field, and a notifications switch
- Use components from the `@acme` registry to build a pricing section

Review:

- Run the SIGMA-UI audit checklist on the components you just added

## Troubleshooting

- **The server does not start.** Run `npx sigma-ui@latest mcp` in the project. It should wait for input without printing anything. Press `Ctrl+C` to stop it. If `npx` cached an old version, run `npx clear-npx-cache`.
- **No tools show up.** Restart the client after changing its config, and check that the server is enabled. Cursor shows logs under View → Output → MCP.
- **A registry is skipped.** List and search report registries they could not read under `skipped`, with the error. Check the URL and that the variables in its headers are set.
- **The wrong style system.** The server reads `styleSystem` from `sigma-ui.config.json` in the folder it starts in. Pass `--cwd` if the client starts it somewhere else.
