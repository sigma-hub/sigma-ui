import { mkdirSync, mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'pathe';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { runBuild } from '../../src/commands/build';
import { resolveRegistryTree } from '../../src/utils/registry';

vi.mock('consola');

describe('runBuild', () => {
  let cwd: string;

  beforeEach(() => {
    cwd = mkdtempSync(path.join(tmpdir(), 'sigma-ui-build-'));
    mkdirSync(path.join(cwd, 'registry/hello'), { recursive: true });
    writeFileSync(path.join(cwd, 'registry/hello/HelloCard.vue'), '<template>Hello</template>\n');
  });

  it('builds a custom registry that add can resolve through a namespace', async () => {
    writeFileSync(path.join(cwd, 'registry.json'), JSON.stringify({
      name: 'acme',
      items: [{ name: 'hello-card', type: 'registry:block', files: [{ path: 'registry/hello/HelloCard.vue', type: 'registry:component' }] }],
    }));

    await runBuild('registry.json', 'public/r', cwd);

    const item = JSON.parse(readFileSync(path.join(cwd, 'public/r/hello-card.json'), 'utf8'));
    expect(item.files[0].content).toBe('<template>Hello</template>\n');

    const tree = await resolveRegistryTree(['@acme/hello-card'], {
      cwd,
      styleSystem: 'tailwind',
      registries: { '@acme': './public/r/{name}.json' },
    });
    expect(tree.map(entry => entry.item.name)).toEqual(['hello-card']);
  });

  it('reports invalid registry files', async () => {
    writeFileSync(path.join(cwd, 'registry.json'), JSON.stringify({ items: [] }));

    await expect(runBuild('registry.json', 'public/r', cwd)).rejects.toThrow(/Invalid registry file[\s\S]*name/);
  });

  it('reports a missing registry file', async () => {
    await expect(runBuild('missing.json', 'public/r', cwd)).rejects.toThrow(/not found/);
  });
});
