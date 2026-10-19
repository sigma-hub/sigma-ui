import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'pathe';

export const MCP_SERVER_NAME = 'sigma-ui';
export const MCP_COMMAND = 'npx';
export const MCP_ARGS = ['sigma-ui@latest', 'mcp'];

export const MCP_CLIENT_NAMES = ['claude', 'cursor', 'vscode', 'codex', 'opencode', 'gemini'] as const;

export type McpClientName = (typeof MCP_CLIENT_NAMES)[number];

interface JsonClient {
  name: McpClientName;
  label: string;
  format: 'json';
  configPath: string;
  /** Key that holds the servers in the client's config file. */
  serversKey: string;
  server: Record<string, unknown>;
  /** Top-level fields written only when the file is created. */
  base?: Record<string, unknown>;
}

interface ManualClient {
  name: McpClientName;
  label: string;
  format: 'manual';
  configPath: string;
  snippet: string;
}

export type McpClient = JsonClient | ManualClient;

const stdioServer = { command: MCP_COMMAND, args: MCP_ARGS };

export const MCP_CLIENTS: McpClient[] = [
  { name: 'claude', label: 'Claude Code', format: 'json', configPath: '.mcp.json', serversKey: 'mcpServers', server: stdioServer },
  { name: 'cursor', label: 'Cursor', format: 'json', configPath: '.cursor/mcp.json', serversKey: 'mcpServers', server: stdioServer },
  { name: 'vscode', label: 'VS Code', format: 'json', configPath: '.vscode/mcp.json', serversKey: 'servers', server: { type: 'stdio', ...stdioServer } },
  {
    name: 'codex',
    label: 'Codex',
    format: 'manual',
    configPath: '~/.codex/config.toml',
    snippet: `[mcp_servers.${MCP_SERVER_NAME}]\ncommand = "${MCP_COMMAND}"\nargs = [${MCP_ARGS.map(arg => `"${arg}"`).join(', ')}]`,
  },
  {
    name: 'opencode',
    label: 'OpenCode',
    format: 'json',
    configPath: 'opencode.json',
    serversKey: 'mcp',
    server: { type: 'local', command: [MCP_COMMAND, ...MCP_ARGS], enabled: true },
    base: { $schema: 'https://opencode.ai/config.json' },
  },
  { name: 'gemini', label: 'Gemini CLI', format: 'json', configPath: '.gemini/settings.json', serversKey: 'mcpServers', server: stdioServer },
];

export function getMcpClient(name: string) {
  const client = MCP_CLIENTS.find(candidate => candidate.name === name);

  if (!client) {
    throw new Error(`Unknown MCP client "${name}". Available clients: ${MCP_CLIENT_NAMES.join(', ')}.`);
  }

  return client;
}

/** The JSON a client needs for the sigma-ui server, as it would appear in a new config file. */
export function mcpClientSnippet(client: McpClient) {
  if (client.format === 'manual') {
    return client.snippet;
  }

  return JSON.stringify({ ...client.base, [client.serversKey]: { [MCP_SERVER_NAME]: client.server } }, null, 2);
}

export type McpInitResult =
  | { status: 'written'; configPath: string; created: boolean }
  | { status: 'manual'; configPath: string; snippet: string; reason: string };

/**
 * Adds the sigma-ui server to the client's project config. Other servers and settings in the file are kept.
 * A file that is not plain JSON (for example JSON with comments) is left alone and the snippet is returned instead.
 */
export async function writeMcpClientConfig(cwd: string, client: McpClient): Promise<McpInitResult> {
  if (client.format === 'manual') {
    return { status: 'manual', configPath: client.configPath, snippet: client.snippet, reason: `${client.label} reads MCP servers from its user config.` };
  }

  const configPath = path.join(cwd, client.configPath);
  const created = !existsSync(configPath);
  let config: Record<string, unknown> = { ...client.base };

  if (!created) {
    const parsed = parseJsonObject(await readFile(configPath, 'utf8'));

    if (!parsed) {
      return {
        status: 'manual',
        configPath: client.configPath,
        snippet: mcpClientSnippet(client),
        reason: `${client.configPath} is not plain JSON, so it was not changed.`,
      };
    }

    config = parsed;
  }

  const servers = config[client.serversKey];
  config[client.serversKey] = {
    ...(isPlainObject(servers) ? servers : {}),
    [MCP_SERVER_NAME]: client.server,
  };

  await mkdir(path.dirname(configPath), { recursive: true });
  await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, 'utf8');

  return { status: 'written', configPath: client.configPath, created };
}

function parseJsonObject(content: string): Record<string, unknown> | null {
  if (!content.trim()) {
    return {};
  }

  try {
    const value: unknown = JSON.parse(content);
    return isPlainObject(value) ? value : null;
  } catch {
    return null;
  }
}

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}
