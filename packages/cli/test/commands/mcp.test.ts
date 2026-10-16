import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { PassThrough } from 'node:stream';
import path from 'pathe';
import { afterEach, describe, expect, it } from 'vitest';
import { handleMcpMessage, serveMcp, type McpResponse } from '../../src/mcp/server';
import { getPackageInfo } from '../../src/utils/get-package-info';

const previousRegistryUrl = process.env.SIGMA_UI_REGISTRY_URL;

afterEach(() => {
  if (previousRegistryUrl === undefined) {
    delete process.env.SIGMA_UI_REGISTRY_URL;
  } else {
    process.env.SIGMA_UI_REGISTRY_URL = previousRegistryUrl;
  }
});

describe('mcp', () => {
  it('answers initialize, tools/list, and ping', async () => {
    const cwd = mkdtempSync(path.join(tmpdir(), 'sigma-ui-mcp-'));
    const initialize = await request(cwd, 'initialize', {
      protocolVersion: '2025-06-18',
      capabilities: {},
      clientInfo: { name: 'test', version: '1.0.0' },
    });

    expect(initialize).toMatchObject({
      jsonrpc: '2.0',
      id: 1,
      result: {
        protocolVersion: '2025-06-18',
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: 'sigma-ui', version: getPackageInfo().version },
      },
    });

    const fallback = await request(cwd, 'initialize', {});
    expect(resultOf(fallback).protocolVersion).toBe('2024-11-05');

    const listed = await request(cwd, 'tools/list');
    const tools = resultOf(listed).tools as Array<{ name: string }>;
    expect(tools.map(tool => tool.name)).toEqual([
      'get_project_registries',
      'list_items_in_registries',
      'search_items_in_registries',
      'view_items_in_registries',
      'get_item_examples_from_registries',
      'get_add_command_for_items',
      'get_audit_checklist',
    ]);

    expect(await request(cwd, 'ping')).toMatchObject({ result: {} });
  });

  it('searches, views, and quotes the add command against a local registry', async () => {
    const project = createProject();
    const search = toolJson(await callTool(project.cwd, 'search_items_in_registries', { query: 'button' }));

    expect(search.isError).toBe(false);
    expect(search.value.registries.map((registry: { registry: string }) => registry.registry)).toEqual(['sigma-ui', '@acme']);
    expect(search.value.registries[0].items.map((item: { name: string }) => item.name)).toEqual(['button', 'button-demo']);
    expect(search.value.skipped).toEqual([]);

    const typed = toolJson(await callTool(project.cwd, 'list_items_in_registries', { types: ['example', 'block'], limit: 1 }));
    expect(typed.value.registries[0]).toMatchObject({ total: 2, items: [{ name: 'button-demo' }] });

    const view = toolJson(await callTool(project.cwd, 'view_items_in_registries', { items: ['button', '@acme/card'] }));
    expect(view.value.items[0].files[0].content).toContain('<template>Button</template>');
    expect(view.value.items[0].dependencies).toEqual(['reka-ui']);
    expect(view.value.items[1].name).toBe('card');
    expect(view.value.errors).toEqual([]);

    const examples = toolJson(await callTool(project.cwd, 'get_item_examples_from_registries', { query: 'button' }));
    expect(examples.value.items).toHaveLength(1);
    expect(examples.value.items[0].files[0].content).toBe('<Button />\n');

    const command = toolText(await callTool(project.cwd, 'get_add_command_for_items', {
      items: ['button', '@acme/card', 'odd name'],
    }));
    expect(command.text).toBe('npx sigma-ui add button @acme/card \'odd name\'');
  });

  it('reports configured registries and still serves the default registry without a config', async () => {
    const project = createProject();
    const configured = toolJson(await callTool(project.cwd, 'get_project_registries'));

    expect(configured.value).toMatchObject({
      configured: true,
      styleSystem: 'tailwind',
    });
    expect(configured.value.registries).toEqual([
      { name: 'sigma-ui', url: project.registry },
      { name: '@acme', url: './acme/{name}.json' },
    ]);

    const bare = mkdtempSync(path.join(tmpdir(), 'sigma-ui-mcp-'));
    process.env.SIGMA_UI_REGISTRY_URL = project.registry;
    const missing = toolJson(await callTool(bare, 'get_project_registries'));
    expect(missing.value.configured).toBe(false);
    expect(missing.value.message).toContain('npx sigma-ui init');
    expect(missing.value.registries).toEqual([{ name: 'sigma-ui', url: project.registry }]);

    const listed = toolJson(await callTool(bare, 'list_items_in_registries', { limit: 0 }));
    expect(listed.value.registries[0].items.map((item: { name: string }) => item.name)).toEqual(['button', 'button-demo', 'login-simple']);
  });

  it('skips a registry that cannot be read and rejects unknown tools and types', async () => {
    const project = createProject({ includeBroken: true });
    const listed = toolJson(await callTool(project.cwd, 'search_items_in_registries', { query: 'card' }));

    expect(listed.value.registries.find((registry: { registry: string }) => registry.registry === '@acme').items[0].name).toBe('card');
    expect(listed.value.skipped[0].registry).toBe('@broken');
    expect(listed.value.skipped[0].error).toContain('not found');

    const onlyBroken = toolText(await callTool(project.cwd, 'list_items_in_registries', { registries: ['@broken'] }));
    expect(onlyBroken.isError).toBe(true);

    const unknownType = toolText(await callTool(project.cwd, 'list_items_in_registries', { types: ['nope'] }));
    expect(unknownType.isError).toBe(true);
    expect(unknownType.text).toContain('registry:ui');
    expect(unknownType.text).toContain('registry:nope');

    const unknownTool = toolText(await callTool(project.cwd, 'install_item', {}));
    expect(unknownTool.isError).toBe(true);
    expect(unknownTool.text).toContain('Unknown tool');

    const missingQuery = toolText(await callTool(project.cwd, 'search_items_in_registries', {}));
    expect(missingQuery.isError).toBe(true);
    expect(missingQuery.text).toContain('query');
  });

  it('caps example results and returns a Vue audit checklist', async () => {
    const registry = mkdtempSync(path.join(tmpdir(), 'sigma-ui-mcp-registry-'));
    const style = path.join(registry, 'tailwind');
    mkdirSync(style, { recursive: true });
    const names = ['demo-alpha', 'demo-bravo', 'demo-charlie', 'demo-delta', 'demo-echo', 'demo-foxtrot'];
    writeFileSync(path.join(style, 'registry.json'), JSON.stringify({
      name: 'sigma-ui',
      items: names.map(name => ({ name, type: 'registry:example', description: name })),
    }));

    for (const name of names) {
      writeFileSync(path.join(style, `${name}.json`), JSON.stringify({
        name,
        type: 'registry:example',
        files: [{ path: `${name}.vue`, type: 'registry:example', content: name }],
      }));
    }

    const cwd = mkdtempSync(path.join(tmpdir(), 'sigma-ui-mcp-'));
    process.env.SIGMA_UI_REGISTRY_URL = registry;
    const examples = toolJson(await callTool(cwd, 'get_item_examples_from_registries', {}));
    expect(examples.value.items.map((item: { name: string }) => item.name)).toEqual(names.slice(0, 5));
    expect(examples.value.limit).toBe(5);

    const checklist = toolText(await callTool(cwd, 'get_audit_checklist'));
    expect(checklist.text).toContain('kebab-case');
    expect(checklist.text).toContain('CSS style-system');
    expect(checklist.text).toContain('typecheck');
    expect(checklist.text).not.toContain('next/image');
  });

  it('ignores notifications, rejects unknown methods, and serves one response per request', async () => {
    const cwd = mkdtempSync(path.join(tmpdir(), 'sigma-ui-mcp-'));
    expect(await handleMcpMessage({ jsonrpc: '2.0', method: 'notifications/initialized' }, cwd)).toBeNull();

    const unknown = await request(cwd, 'resources/list');
    expect(unknown?.error).toMatchObject({ code: -32601 });

    const input = new PassThrough();
    const output = new PassThrough();
    const chunks: Buffer[] = [];
    output.on('data', (chunk: Buffer) => chunks.push(chunk));
    const done = serveMcp({ cwd, input, output });
    input.write(`${JSON.stringify({ jsonrpc: '2.0', method: 'notifications/initialized' })}\n`);
    input.write('not-json\n');
    input.write(`${JSON.stringify({ jsonrpc: '2.0', id: 7, method: 'ping' })}\n`);
    input.end();
    await done;

    const lines = Buffer.concat(chunks).toString('utf8').trim().split('\n');
    expect(lines).toHaveLength(2);
    expect(JSON.parse(lines[0]).error.code).toBe(-32700);
    expect(JSON.parse(lines[1])).toMatchObject({ id: 7, result: {} });
  });
});

function createProject(options: { includeBroken?: boolean } = {}) {
  const cwd = mkdtempSync(path.join(tmpdir(), 'sigma-ui-mcp-'));
  const registry = mkdtempSync(path.join(tmpdir(), 'sigma-ui-mcp-registry-'));
  const style = path.join(registry, 'tailwind');
  mkdirSync(style, { recursive: true });
  mkdirSync(path.join(cwd, 'acme'), { recursive: true });

  writeFileSync(path.join(style, 'registry.json'), JSON.stringify({
    name: 'sigma-ui',
    items: [
      { name: 'button', type: 'registry:ui', title: 'Button', description: 'A button' },
      { name: 'button-demo', type: 'registry:example', description: 'Button example' },
      { name: 'login-simple', type: 'registry:block', description: 'A login form' },
    ],
  }));
  writeFileSync(path.join(style, 'button.json'), JSON.stringify({
    name: 'button',
    type: 'registry:ui',
    description: 'A button',
    dependencies: ['reka-ui'],
    registryDependencies: [],
    files: [{ path: 'ui/button/Button.vue', type: 'registry:ui', content: '<template>Button</template>\n' }],
  }));
  writeFileSync(path.join(style, 'button-demo.json'), JSON.stringify({
    name: 'button-demo',
    type: 'registry:example',
    description: 'Button example',
    files: [{ path: 'examples/ButtonDemo.vue', type: 'registry:example', content: '<Button />\n' }],
  }));
  writeFileSync(path.join(cwd, 'acme', 'registry.json'), JSON.stringify({
    name: 'acme',
    items: [{ name: 'card', type: 'registry:ui', description: 'A card' }],
  }));
  writeFileSync(path.join(cwd, 'acme', 'card.json'), JSON.stringify({
    name: 'card',
    type: 'registry:ui',
    description: 'A card',
    files: [{ path: 'ui/card/Card.vue', type: 'registry:ui', content: '<template>Card</template>\n' }],
  }));
  writeFileSync(path.join(cwd, 'sigma-ui.config.json'), JSON.stringify({
    styleSystem: 'tailwind',
    cssPath: 'src/assets/css/tailwind.css',
    aliases: { components: '@/components/ui' },
    registries: {
      '@acme': './acme/{name}.json',
      ...(options.includeBroken ? { '@broken': './missing/{name}.json' } : {}),
    },
  }));

  process.env.SIGMA_UI_REGISTRY_URL = registry;
  return { cwd, registry };
}

function request(cwd: string, method: string, params?: unknown) {
  return handleMcpMessage({ jsonrpc: '2.0', id: 1, method, params }, cwd);
}

function callTool(cwd: string, name: string, args: Record<string, unknown>) {
  return request(cwd, 'tools/call', { name, arguments: args });
}

function resultOf(response: McpResponse | null) {
  return response?.result as Record<string, unknown>;
}

function toolPayload(response: McpResponse | null) {
  const result = response?.result as { content?: Array<{ text: string }>; isError?: boolean };
  return {
    text: result.content?.[0]?.text ?? '',
    isError: result.isError ?? false,
  };
}

function toolText(response: McpResponse | null) {
  return toolPayload(response);
}

function toolJson(response: McpResponse | null) {
  const payload = toolPayload(response);
  return { ...payload, value: JSON.parse(payload.text) };
}
