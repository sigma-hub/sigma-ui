import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'pathe';
import { describe, expect, it } from 'vitest';
import { getMcpClient, MCP_CLIENT_NAMES, mcpClientSnippet, writeMcpClientConfig } from '../../src/mcp/clients';
import { TOOL_DEFINITIONS } from '../../src/mcp/tools';
import { loadEnvFiles } from '../../src/utils/env-files';

function tempProject() {
  return mkdtempSync(path.join(tmpdir(), 'sigma-ui-mcp-init-'));
}

function readJson(file: string) {
  return JSON.parse(readFileSync(file, 'utf8'));
}

describe('mcp init', () => {
  it.each([
    ['claude', '.mcp.json', 'mcpServers'],
    ['cursor', '.cursor/mcp.json', 'mcpServers'],
    ['vscode', '.vscode/mcp.json', 'servers'],
    ['gemini', '.gemini/settings.json', 'mcpServers'],
  ])('writes the %s config', async (name, file, key) => {
    const cwd = tempProject();
    const result = await writeMcpClientConfig(cwd, getMcpClient(name));

    expect(result).toEqual({ status: 'written', configPath: file, created: true });
    expect(readJson(path.join(cwd, file))[key]['sigma-ui']).toMatchObject({ command: 'npx', args: ['sigma-ui@latest', 'mcp'] });
  });

  it('writes the OpenCode config with its schema and local command', async () => {
    const cwd = tempProject();
    await writeMcpClientConfig(cwd, getMcpClient('opencode'));

    expect(readJson(path.join(cwd, 'opencode.json'))).toEqual({
      $schema: 'https://opencode.ai/config.json',
      mcp: { 'sigma-ui': { type: 'local', command: ['npx', 'sigma-ui@latest', 'mcp'], enabled: true } },
    });
  });

  it('keeps other servers and settings, and updates its own entry', async () => {
    const cwd = tempProject();
    writeFileSync(path.join(cwd, '.mcp.json'), JSON.stringify({
      mcpServers: { 'other': { command: 'other-server' }, 'sigma-ui': { command: 'old' } },
      keep: true,
    }));

    const result = await writeMcpClientConfig(cwd, getMcpClient('claude'));
    const config = readJson(path.join(cwd, '.mcp.json'));

    expect(result).toMatchObject({ status: 'written', created: false });
    expect(config.keep).toBe(true);
    expect(config.mcpServers.other).toEqual({ command: 'other-server' });
    expect(config.mcpServers['sigma-ui']).toEqual({ command: 'npx', args: ['sigma-ui@latest', 'mcp'] });
  });

  it('leaves a config with comments alone and returns the snippet', async () => {
    const cwd = tempProject();
    mkdirSync(path.join(cwd, '.vscode'));
    const source = '{\n  // my servers\n  "servers": {}\n}\n';
    writeFileSync(path.join(cwd, '.vscode/mcp.json'), source);

    const result = await writeMcpClientConfig(cwd, getMcpClient('vscode'));

    expect(result.status).toBe('manual');
    expect(readFileSync(path.join(cwd, '.vscode/mcp.json'), 'utf8')).toBe(source);
    expect(result.status === 'manual' && JSON.parse(result.snippet).servers['sigma-ui'].type).toBe('stdio');
  });

  it('prints the Codex TOML instead of writing the user config', async () => {
    const cwd = tempProject();
    const result = await writeMcpClientConfig(cwd, getMcpClient('codex'));

    expect(result.status).toBe('manual');
    expect(mcpClientSnippet(getMcpClient('codex'))).toBe('[mcp_servers.sigma-ui]\ncommand = "npx"\nargs = ["sigma-ui@latest", "mcp"]');
  });

  it('rejects unknown clients', () => {
    expect(() => getMcpClient('emacs')).toThrow(`Available clients: ${MCP_CLIENT_NAMES.join(', ')}`);
  });
});

describe('mcp env files', () => {
  it('loads .env and .env.local without overriding the environment', () => {
    const cwd = tempProject();
    writeFileSync(path.join(cwd, '.env'), 'REGISTRY_TOKEN=from-env\nSHARED=env\n');
    writeFileSync(path.join(cwd, '.env.local'), 'SHARED=local\nLOCAL_ONLY=1\n');
    const env: NodeJS.ProcessEnv = { REGISTRY_TOKEN: 'already-set' };

    expect(loadEnvFiles(cwd, env).sort()).toEqual(['LOCAL_ONLY', 'SHARED']);
    expect(env).toEqual({ REGISTRY_TOKEN: 'already-set', SHARED: 'local', LOCAL_ONLY: '1' });
  });
});

describe('mcp tool metadata', () => {
  it('gives every tool a title and marks it read-only', () => {
    for (const tool of TOOL_DEFINITIONS) {
      expect(tool.title).toBeTruthy();
      expect(tool.annotations.readOnlyHint).toBe(true);
    }
  });
});
